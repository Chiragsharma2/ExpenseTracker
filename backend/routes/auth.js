import express from 'express';
import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const userRouter = express.Router();

userRouter.post('/register', async (req, res) => {
    try{
        const { username, password, email } = req.body;
        console.log('Received registration data:', { username, email }); // Don't log passwords

        //check if user already exists
        const existingUser = await User.findOne({ username });
        if(existingUser) {
            return res.status(400).json({ message: 'User alrady exists'});
        }

        const user = new User({ username, password, email });
        await user.save();

        //create JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        
        res.status(201).json({ message: "User registered successfully", token });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Error registrating user' });
    }
});

userRouter.post('/login', async (req, res)=> {
    try{
        const { username, password} = req.body;
        console.log('Login attempt for user:', username);

        const user = await User.findOne({ username });
        if(!user) {
            console.log('User not found:', username);
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            console.log('User not found:', username);
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h'});
        console.log('login successful for user:', username);
        res.json({ token, user: { id: user._id, username: user.username } });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error during login', error: error.message });
    }
}) 

export default userRouter;