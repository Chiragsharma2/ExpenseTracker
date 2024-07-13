import React, { useState, useEffect } from 'react';
import ExpenseItem from './ExpenseItem';
import EmptyState from './EmptyState';


function ExpenseList({ expenses, handleDelete, handleEdit, isLoading, error, searchTerm, setSearchTerm, setIsFormVisible }) {

  

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  

  return (
          <div>
            <h2 className="text-xl font-semibold text-indigo-800 mb-4">Expense List</h2>
              <input 
                        type="text"
                        placeholder="Search expenses..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-2 border rounded mb-4"
                      />
          {expenses && expenses.length > 0 ? (
              <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
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
            <EmptyState
              message="No Expenses Found"
              actionText="Add Your Expense"
              onAction={() =>setIsFormVisible(true)}
            />
          )}
          </div>
  );
}

export default ExpenseList;