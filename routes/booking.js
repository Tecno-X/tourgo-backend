import express from 'express';
import Booking from '../models/Booking.js';
const router = express.Router();

router.post('/', async (req, res) => {
  const { userId, type, reference, details, totalPrice, currency } = req.body;
  const booking = new Booking({ user: userId, type, reference, details, totalPrice, currency });
  await booking.save();
  res.status(201).json({ message: 'Reserva criada com sucesso.', booking });
});

router.get('/user/:userId', async (req, res) => {
  const bookings = await Booking.find({ user: req.params.userId });
  res.json(bookings);
});

export default router;