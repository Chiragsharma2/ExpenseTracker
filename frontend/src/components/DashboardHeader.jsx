import React from "react";
import { FaMoneyCheckDollar } from "react-icons/fa6";

export default function DashboardHeader( { handleLogout }) {

    return (
        <nav className="bg-indigo-600 text-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <h1 className="inline-flex items-center text-xl font-bold text-white"><FaMoneyCheckDollar className="mr-2"/><span className="hidden md:block">ExpenseEase</span></h1>
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
    )
}