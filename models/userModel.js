import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true,
        trim: true
    },
    role: {
        type: String,
        default: 'user'
    },
    token: String,
    provider: {
      type: String,
      enum: ["GOOGLE", "System"],
      default: "System",
    },
});

const User = mongoose.model('User', userSchema);
export default User;
