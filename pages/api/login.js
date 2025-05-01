import connectDB from '../../dbConfig';
import User from '../../userModel';
import bcrypt from 'bcrypt';
import { generateToken } from '../../utils/authUtils';

const secret = process.env.JWT_SECRET;

connectDB();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

    try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user._id, user.role);
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    await client.close();
  }
}