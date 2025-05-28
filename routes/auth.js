import express from 'express';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

router.post('/register', async (req, res) => {
  const { fullName, email, password, country, fiscalId, phone, language } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: 'Email já registrado.' });

  const passwordHash = await bcrypt.hash(password, 10);
  const user = new User({ fullName, email, passwordHash, country, fiscalId, phone, language });
  await user.save();
  res.status(201).json({ message: 'Usuário registrado com sucesso.' });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: 'Usuário não encontrado.' });

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return res.status(401).json({ message: 'Senha incorreta.' });

  const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
  res.json({ token, user: { _id: user._id, fullName: user.fullName, email: user.email, role: user.role } });
});

router.get('/all', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

export default router;