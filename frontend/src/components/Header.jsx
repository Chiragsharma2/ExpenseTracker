import React from "react";
import { Link } from "react-router-dom";
import { RiLoginBoxLine } from "react-icons/ri";
import { FaMoneyCheckDollar } from "react-icons/fa6";

export default function Header() {
    return (
            <nav className="bg-indigo-600 shadow-lg text-white">
                <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                    <Link to="/" className="flex items-center space-x-2">
                    <FaMoneyCheckDollar className="h-8 w-8" />
                    <h1 className="hidden md:block text-2xl font-bold">ExpenseEase</h1>
                    </Link>
                    <Link
                    to="/login"
                    className="bg-white text-indigo-600 px-4 py-2 rounded-md hover:bg-indigo-100 transition-colors duration-300 flex items-center space-x-2"
                    >
                    <RiLoginBoxLine />
                    <span>Login</span>
                    </Link>
                </div>
            </nav>
    )
}