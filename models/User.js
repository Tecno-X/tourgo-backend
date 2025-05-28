import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  fullName: String,
  email: { type: String, unique: true },
  passwordHash: String,
  country: String,
  fiscalId: String,
  phone: String,
  language: String,
  role: { type: String, enum: ['client', 'admin'], default: 'client' }
}, { timestamps: true });

export default mongoose.model('User', userSchema);