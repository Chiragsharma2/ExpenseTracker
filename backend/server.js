import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import router from './routes/expenses.js';
import userRouter from './routes/auth.js';

dotenv.config();  //Load Environment Variables

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', userRouter);
app.use('/api/expenses',router);


//Connect to MongoDB;
connectDB();

app.get('/', (req, res) => {
    res.send("expense tracker App");
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})