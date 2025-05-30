import { Schema, model } from 'mongoose';

const adminSchema = new Schema({
  name: String,
  contactNumber: String,
  email: String,
  about: String,
  news: String,
});

export default model('Admin', adminSchema);
