import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { type } from 'os';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: {type: String, require: true },
    email: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now }
});

//Hash the password before saving
userSchema.pre('save', async function(next) {
    if(this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8);
    }
    next();
});

export default mongoose.model('User', userSchema);