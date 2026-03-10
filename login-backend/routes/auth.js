import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../src/db.js';
import dotenv from 'dotenv';
import protectRoute from '../middleware/protectRoute.js'

const router = express.Router();

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds
}

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET,{
        expiresIn : '30d'
    });
}

router.post('/register' , async(req,res) => {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
        return res.status(400).json({message: 'Please provide all required fields'});
    }

    const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (userExists.rows.length > 0){
        return res.status(400).json({ message: 'User already exists'});
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await pool.query(
        'INSERT INTO USERS (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
        [name, email, hashPassword]
    );

    const token = generateToken(newUser.rows[0].id);
    res.cookie('token', token, cookieOptions);

    return res.status(201).json({ user: newUser.rows[0]});
})

router.post('/login' , async(req,res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({message: 'Please provide all required fields'});
    }

    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (user.rows.length === 0) {
        return res.status(404).json({ message: 'New user please register first' });
    }

    const userData = user.rows[0]

    const isMatch = await bcrypt.compare(password, userData.password)

    if (isMatch === true){
        const token = generateToken(userData.id);
        res.cookie('token', token, cookieOptions);
        return res.status(200).json({ user: userData });
    } else {
        return res.status(400).json({ message: 'Invalid credentials'})
    }
})

router.get('/me', protectRoute , async(req,res) =>{
    res.json(req.user);
})

router.post('/logout', (req, res) => {
    res.cookie('token', '', {...cookieOptions, maxAge: 1});
    res.json({message: 'Logged out succesfully'});
})

export default router;