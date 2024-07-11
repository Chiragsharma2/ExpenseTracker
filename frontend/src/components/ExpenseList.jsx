import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getExpenses, deleteExpense } from '../services/api';
import ExpenseItem from './ExpenseItem';
import ExpenseForm from './ExpenseForm';


function ExpenseList() {
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expenseToEdit, setExpenseToEdit] = useState(null);

  const navigate = useNavigate();

  const fetchExpenses = async () => {
    try {
      setIsLoading(true);
      const response = await getExpenses();
      console.log('Fetched expenses:', response);  // Add this line
      setExpenses(response);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching expenses:', error);
      setError('Failed to fetch expenses. Please try again later.');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, [expenseToEdit]);

  const handleDelete = async (id) => {
    try {
      await deleteExpense(id);
      setExpenses(expenses.filter(expense => expense._id !== id));
    } catch (error) {
      console.error('Error deleting expense:', error);
      setError('Failed to delete expense. Please try again.');
    }
  };

  const handleEdit = (expense) => {
    setExpenseToEdit(expense);
  };

  const handleExpenseAdded = (newExpense) => {
    setExpenses([...expenses, newExpense]);
  }

  const handleExpenseUpdated = (updatedExpense) => {
    setExpenses(expenses.map(expense => 
      expense._id === updatedExpense._id ? updatedExpense : expense
    ));
    setExpenseToEdit(null);
  }

  const handleCancelEdit = () => {
    setExpenseToEdit(null);
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100">
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold text-gray-800">CashCompass</h1>
            </div>
          </div>
          <div className="flex items-center">
            <button
              onClick={handleLogout}
              className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 w-">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Expense Dashboard</h2>
            
            <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">{expenseToEdit ? 'Update the Expense': 'Add New Expense'}</h3>
                <ExpenseForm 
                  expenseToEdit={expenseToEdit}
                  onExpenseAdded={handleExpenseAdded}
                  onExpenseUpdated={handleExpenseUpdated}
                  onCancelEdit={handleCancelEdit}
                />
              </div>
            </div>

            {isLoading ? (
              <div className="text-center">
                <div className="spinner">Loading...</div>
              </div>
            ) : error ? (
              <div className="text-red-500">{error}</div>
            ) : expenses && expenses.length > 0 ? (
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <ul className="divide-y divide-gray-200">
                  {expenses.map((expense) => (
                    <ExpenseItem
                      key={expense._id}
                      expense={expense}
                      onDelete={handleDelete}
                      onEdit={() => handleEdit(expense)}
                    />
                  ))}
                </ul>
              </div>
            ) : (
              <p className="text-center text-gray-500">No expenses found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExpenseList;