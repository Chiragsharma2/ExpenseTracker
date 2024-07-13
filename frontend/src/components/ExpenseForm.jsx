import React, { useEffect, useState } from 'react';
import { createExpense, updateExpense } from '../services/api';

export default function ExpenseForm({ expenseToEdit, onExpenseAdded, onExpenseUpdated, onCancelEdit, expenses }) {
    const [expense, setExpense] = useState({
        description: '',
        amount: '',
        category:''
    });
    const [isaddingNewCategory, setIsAddingNewCategory] = useState(false);

    useEffect(() => {
        if(expenseToEdit){
            setExpense(expenseToEdit);
        }
    }, [expenseToEdit]);

    const handleChange = (e) => {
        const {name, value } =e.target;
        if (name === 'category' ) {
            if( value === 'add') {
                setIsAddingNewCategory(true);
                setExpense(prevExpense => ({ ...prevExpense, category: '' }));
            } else if(!isaddingNewCategory) {
                setExpense(prevExpense => ({ ...prevExpense, category: value }));
            }
        } else setExpense(prevExpense =>({...prevExpense, [name]: value }))
    }

    const handleNewCategoryChange = (e) => {
        setExpense(prevExpense => ({ ...prevExpense, category: e.target.value }));
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
           setExpense({ description: '', amount: '', category: '' });
        } catch (error) {
            console.error("error adding:", error);
            alert("Expense could not be Added");
        }
    };

    return (
        <div className="">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Expense Dashboard</h2>
          
          <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">{expenseToEdit ? 'Update the Expense': 'Add New Expense'}</h3>
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
                <div>
                <label htmlFor='category' className='block text-sm font-medium text-gray-700'>Category</label>
                {isaddingNewCategory ? (
                    <div>
                    <input 
                        type='text'
                        name='category'
                        value={expense.category}
                        onChange={handleNewCategoryChange}
                        placeholder='Add category'
                        className='mt-1 p-1 block w-full rounded-md bg-gray-100 border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                        required
                    />
                    <button 
                        type="button" 
                        onClick={() => {
                            setIsAddingNewCategory(false);
                            setExpense(prevExpense => ({ ...prevExpense, category: '' }));
                        }}
                        className="mt-2 ml-2 px-1 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                    </div>
                ) :(
                    <select 
                        name='category'
                        value={expense.category}
                        onChange={handleChange}
                        placeholder='category'
                        className='mt-1 p-1 block w-full bg-gray-100 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                        required
                    >   
                        <option value=""></option>
                        {expenses.map(expense => <option key={expense.category} value={expense.category}>{expense.category}</option>)}
                        <option value='add'>+add</option>
                    </select>
                )}
                </div>
                <button type="submit" className="inline-flex justify-center mt-3 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" >
                   {expenseToEdit ? 'Update' : 'Add' }Expense
                </button>
                {expenseToEdit && <button type='button' className='inline-flex justify-center ml-2 mt-3 px-4 py-2 border border-transparent font-medium text-sm font-medium rounded-md text-red-700 bg-red-300 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500' onClick={() => { onCancelEdit(); setExpense({ description: '', amount: '' }); }}>Cancel</button>}
                </form>
            </div>
            </div>
            </div>
            </div>
          </div>
    )
}