import React from "react";
import { Link } from "react-router-dom";


export default function Home() {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
            <h1 className="text-4xl font-bold text-blue-600 mb-4">Welcome To Expense Tracker</h1>
            <p className="text-xl text-gray-700 mb-8">Take control of your finances with ease.</p>
            <div className="space-x-4">
            <Link to="/login" className="bg-blue-500 hover:bg:blue-600 text-white font-bold py-2 px-4 rounded">Login</Link>
            <Link to="/register" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">Register</Link>
        </div>
        <div className="mt-12 grid grid-cols-3 gap-8">
            <FeaturedCard icon="📊" title="Track Epenses" description="Easily log and categorize your spending" />
            <FeaturedCard icon="💰" title="Set Budgets" description="Create budgets and stick to them" />
            <FeaturedCard icon="📈" title="Visualize Data" description="See your spending patterns with charts" />
        </div>
        </div>
    )

};

const FeaturedCard = ({ icon, title, description }) => (
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <div className="text-4xl font-semibold mb-2">{icon}</div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </div>
);



