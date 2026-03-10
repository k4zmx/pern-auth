import jwt from 'jsonwebtoken';
import pool from '../src/db.js';

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: 'Not authorized, no token' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await pool.query(
            'SELECT id, username, email FROM users WHERE id = $1',
            [decoded.id]
        );

        if (user.rows.length === 0) {
            return res.status(401).json({ message: 'User not found' });
        }

        req.user = user.rows[0];
        next();

    } catch (error) {
        return res.status(401).json({ message: 'Not authorized, invalid token' });
    }
};

export default protectRoute;
