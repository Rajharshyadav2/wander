import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    trim: true,
    maxlength: [16, 'name can not be more than 16 characters'],
  },
  userEmail: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  userPassword: {
    type: String,
    required: true,
  },
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
