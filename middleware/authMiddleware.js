import jwt from 'jsonwebtoken';
import User from '../userModel';

const secret = process.env.JWT_SECRET;

export const authMiddleware = (handler) => async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Authorization token required' });
    }

    const decoded = jwt.verify(token, secret);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    req.user = user;
    return handler(req, res);
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export const adminMiddleware = (handler) => async (req, res) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  return handler(req, res);
};