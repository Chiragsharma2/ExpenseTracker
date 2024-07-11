import mongoose from 'mongoose';
import { type } from 'os';

const ExpenseSchema = new mongoose.Schema({
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  amount: {
    type: Number,
    required: [true, 'Please add an amount']
  },
  date: {
    type: Date,
    default: Date.now
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Expense = mongoose.model('Expense', ExpenseSchema);

export default Expense;