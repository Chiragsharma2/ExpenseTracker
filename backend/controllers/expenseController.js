import Expense from '../models/expense.js';

// Get all expenses
export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.userId });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Create a new expense
export const createExpense = async (req, res) => {
  try {
    const newExpense = new Expense({
      ...req.body,
      user: req.user.userId   // This comes from the auth middleware
    });
    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// Get a specific expense
export const getExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) return res.status(404).json({ message: 'Expense not found' });
    res.status(200).json(expense);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Update an expense
export const updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findOneAndUpdate({
      _id: req.params.id, user: req.user.userId },
      req.body, {new : true}
    );
    if(!expense) return res.status(404).json({ message: 'Expense not found' });
    res.status(200).json(expense);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an expense
export const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({ _id: req.params.id, user: req.user.userId });
    if(!expense) return res.status(404).json({ message: 'Expense not found' }); 
    res.status(200).json({ message: 'Expense deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};