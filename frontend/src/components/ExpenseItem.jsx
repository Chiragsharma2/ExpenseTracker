import React from 'react';

export default function ExpenseItem({ expense, onDelete, onEdit}) {
    return (
        <li className="px-4 py-4 sm:px-6 hover:bg-gray-100">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    </div>
                    <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{expense.description}</p>
                        <p className="text-sm text-gray-500">${expense.amount}</p>
                    </div>
                </div>
                <div className="flex space-x-2">
                    <button onClick={() => onEdit(expense)} className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Edit
                    </button>
                    <button onClick={() => onDelete(expense._id)} className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                        Delete
                    </button>
                </div>
            </div>
            <p className="mt-1 text-sm text-gray-500">{new Date(expense.date).toLocaleDateString()}</p>
        </li>
    )
}