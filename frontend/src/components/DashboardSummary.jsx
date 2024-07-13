import React from "react";

export default function DashboardSummary({ totalExpense, avgDailySpend, topCategory}) {

    return (
        <div className="grid grid-cols-1 gap-6 mt-2 mb-4 lg:grid-cols-3">
                        <div className="bg-indigo-100 p-4 rounded-lg">
                            <p className="text-sm text-indigo-600">Total Expenses</p>
                            <p className="text-xl font-bold text-indigo-800">${totalExpense.toFixed(2)}</p>
                        </div>
                        <div className="bg-indigo-100 p-4 rounded-lg">
                            <p className="text-sm text-indigo-600">Avg. Daily Spend</p>
                            <p className="text-xl font-bold text-indigo-800">${avgDailySpend.toFixed(2)}</p>
                        </div>
                        <div className="bg-indigo-100 p-4 rounded-lg">
                            <p className="text-sm text-indigo-600">Top Category</p>
                            <p className="text-xl font-bold text-indigo-800">{topCategory}</p>
                        </div>
            </div>
    )
}