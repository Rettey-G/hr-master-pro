import connectDB from '../../dbConfig';
import User from '../../userModel';
import { authMiddleware, adminMiddleware } from '../../middleware/authMiddleware';

connectDB();

export default async function handler(req, res) {
  return authMiddleware(adminMiddleware(async (req, res) => {
  if (req.method === 'POST') {
    try {
      const { username, password, role, employeeId } = req.body;
      const newUser = new User({ username, password, role, employeeId });
      await newUser.save();
      res.status(201).json({ success: true, data: newUser });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}))(req, res);