import express from 'express';
import { getExpenses, createExpense, getExpense, updateExpense, deleteExpense } from '../controllers/expenseController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, getExpenses);
router.post('/', auth, createExpense);
router.get('/:id', auth, getExpense);
router.patch('/:id', auth, updateExpense);
router.delete('/:id', auth, deleteExpense);

export default router;