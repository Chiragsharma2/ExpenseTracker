import React, { useEffect, useState } from 'react';
import { createExpense, updateExpense } from '../services/api';

export default function ExpenseForm({ expenseToEdit, onExpenseAdded, onExpenseUpdated, onCancelEdit }) {
    const [expense, setExpense] = useState({
        description: '',
        amount: ''
    });

    useEffect(() => {
        if(expenseToEdit){
            setExpense(expenseToEdit);
        }
    }, [expenseToEdit]);

    const handleChange = (e) => {
        const {name, value } =e.target;
        setExpense(prevExpense => ({ ...prevExpense, [name]:value}));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
           if (expenseToEdit) {
            const updatedExpense = await updateExpense(expenseToEdit._id, expense);
            onExpenseUpdated(updatedExpense);
           } else {
           const newExpense = await createExpense(expense);
           onExpenseAdded(newExpense);
           }
           setExpense({ description: '', amount: '' });
        } catch (error) {
            console.error("error adding:", error);
            alert("Expense could not be Added");
        }
    };

    return (
        <form onSubmit = {handleSubmit} >
                <div>
                    <label htmlFor='description' className='block text-sm font-medium text-gray-700'>Description</label>
                    <input 
                        type='text'
                        name='description'
                        value={expense.description}
                        onChange={handleChange}
                        placeholder='description'
                        className='mt-1 p-1 block w-full bg-gray-100 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                        required
                    />
                </div>
                <div>
                    <label htmlFor='amount' className='block text-sm font-medium text-gray-700'>Amount</label>
                    <input 
                        type='number'
                        name='amount'
                        value={expense.amount}
                        onChange={handleChange}
                        placeholder='amount'
                        className='mt-1 p-1 block w-full rounded-md bg-gray-100 border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                        required
                    />
                </div>
                <button type="submit" className="inline-flex justify-center mt-3 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" >
                   {expenseToEdit ? 'Update' : 'Add' }Expense
                </button>
                {expenseToEdit && <button type='button' className='inline-flex justify-center ml-2 mt-3 px-4 py-2 border border-transparent font-medium text-sm font-medium rounded-md text-red-700 bg-red-300 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500' onClick={() => { onCancelEdit(); setExpense({ description: '', amount: '' }); }}>Cancel</button>}
                </form>
    )
}