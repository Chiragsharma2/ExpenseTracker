import React, { useState , useEffect, useRef }from "react";
import { useNavigate } from 'react-router-dom';
import { getExpenses, deleteExpense } from '../services/api';
import ExpenseList from "./ExpenseList";
import ExpenseVisualization from "./ExpenseVisualization";
import ExpenseForm from './ExpenseForm';
import DashboardHeader from "./DashboardHeader";
import DashboardSummary from "./DashboardSummary";
import DashboardFilters from "./DashboardFilters";


export default function Dashboard () {
    const [expenses, setExpenses] = useState([]);
    const [expenseToEdit, setExpenseToEdit] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [totalExpense, setTotalExpenses] = useState(0);
    const [avgDailySpend, setAvgDailySpend] = useState(0);
    const [topCategory, setTopCategory] = useState('');

    const [isFormVisible, setIsformVisible] = useState(false);
    const [filterCategory, setFilterCategory] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('date');
    const [sortOrder,setSortOrder] = useState('desc');
    

    const formRef = useRef(null);

    const navigate = useNavigate();


    const filteredAndSortedExpenses = expenses
        .filter(expense => 
        (!filterCategory || expense.category == filterCategory) &&
        (expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
         expense.category.toLowerCase().includes(searchTerm.toLowerCase()))
        )
        .sort((a,b) => {
            if(sortBy === 'date') {
                return sortOrder === 'asc' ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date);
            }else if (sortBy === 'amount') {
                return sortOrder === 'asc' ? a.amount - b.amount : b.amount - a.amount;
            }
            return 0;
        });

        const uniqueCategories = [...new Set(expenses.map(expense => expense.category))];

    useEffect(() => {
        if(expenses.length > 0) {
            const total = expenses.reduce((sum,exp) => sum+exp.amount,0); 
            setTotalExpenses(total);
            setAvgDailySpend(total/30);
            const categories = {};
            expenses.forEach(exp => {
                categories[exp.category] = (categories[exp.category] || 0) + exp.amount;
            })
            setTopCategory(Object.keys(categories).reduce((a, b) => categories[a] > categories[b] ? a : b))
        }
    }, [expenses]);

    const fetchExpenses = async () => {
      try {
        setIsLoading(true);
        const response = await getExpenses();
        console.log('Fetched expenses:', response);
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
        setIsformVisible(true);
        setTimeout(() => {
            formRef.current?.scrollIntoView({ behavior: 'smooth' });
            formRef.current?.classList.add('highlight-form');
            setTimeout(() => {
                formRef.current?.classList.remove('highlight-form');
            }, 1000);
        }, 100);
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
        setIsformVisible(!isFormVisible);
      }
    
      const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
      }
    return (
        <div className="bg-gray-100 min-h-screen">
            <DashboardHeader handleLogout={handleLogout} />
            <div className="container mx-auto p-4 sm:p-6">

                <div className=" mt-6 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                    <h1 className="text-3xl font-bold text-indigo-800 mb-4 sm:mn-0">Expense Dashboard</h1>
                    <button 
                        onClick={() => setIsformVisible(!isFormVisible)}
                        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors"
                    >
                        {isFormVisible ? 'Hide Form' : 'Add Expense'}
                    </button>
                </div>
                <DashboardSummary totalExpense={totalExpense} avgDailySpend={avgDailySpend} topCategory={topCategory} />
                <div ref={formRef}>
                {isFormVisible && (
                        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                            <ExpenseForm 
                                expenseToEdit={expenseToEdit}
                                onExpenseAdded={handleExpenseAdded}
                                onExpenseUpdated={handleExpenseUpdated}
                                onCancelEdit={handleCancelEdit}
                                expenses={expenses}
                            />
                    </div>
                )}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <div className="bg-white- rounded-lg shadow-md p-6">
                            <ExpenseVisualization expenses={filteredAndSortedExpenses} />
                        </div>
                    </div>
                    <DashboardFilters
                        filterCategory={filterCategory}
                        setFilterCategory={setFilterCategory}
                        sortBy={sortBy}
                        setSortBy={setSortBy}
                        sortOrder={sortOrder}
                        setSortOrder={setSortOrder}
                        uniqueCategories={uniqueCategories}
                    />
                </div>
                <div className="bg-white rounded-lg shadow-md p-6">
                    <ExpenseList 
                        expenses={filteredAndSortedExpenses} 
                        handleDelete={handleDelete} 
                        handleEdit={handleEdit} 
                        isLoading={isLoading} 
                        error={error}
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        setIsFormVisible={setIsformVisible}
                    />
                </div>
            </div>
        </div>
    );
}