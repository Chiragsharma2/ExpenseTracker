import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow bg-gradient-to-b from-gray-100 to-white">
            <div className="container mx-auto px-4 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-indigo-600 mb-4">
                    Track Expenses, Gain Clarity
                    </h1>
                    <p className="text-xl text-gray-700 mb-8">
                    Effortlessly manage your spending with ExpenseEase.
                    </p>
                    <Link
                    to="/login"
                    className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors duration-300"
                    >
                    Get Started
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <FeaturedCard
                    icon="📊"
                    title="Visualize Data"
                    description="Understand your spending patterns with intuitive charts"
                    />
                    <FeaturedCard
                    icon="🏷️"
                    title="Track Expenses"
                    description="Easily log and categorize your daily expenses"
                    />
                    <FeaturedCard
                    icon="🔍"
                    title="Efficient Searching"
                    description="Quickly find and analyze your past expenses"
                    />
                </div>
            </div>
        </main>

        <Footer />
        </div>
  );
}

const FeaturedCard = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);