import React from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function AboutUs() {
  return (
    
    <div className="flex flex-col min-h-screen">
        <Header />
      <main className="flex-grow bg-gradient-to-b from-gray-100 to-white">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-indigo-600 mb-8 text-center">About ExpenseEase</h1>
          
          <div className="bg-white shadow-md rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold text-indigo-600 mb-4">Our Mission</h2>
            <p className="text-gray-700 mb-4">
              At ExpenseEase, our mission is to empower individuals and businesses to take control of their finances through simple, intuitive expense tracking. We believe that financial clarity leads to better decision-making and ultimately, a more secure financial future.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 mt-8">
                <h2 className="text-2xl font-semibold text-indigo-600 mb-4">About the Developer</h2>
                <p className="text-gray-700 mb-4">
                    ExpenseEase is developed by Chirag Sharma, an ambitious undergraduate pursuing a B.Tech in Computer Science. As an emerging software engineer with a passion for web development, Chirag is dedicated to creating intuitive and impactful digital solutions.
                </p>
                <p className="text-gray-700 mb-4">
                    This project has been a significant milestone in Chirag's journey, providing valuable insights into full-stack development, user experience design, and project management. It stands as a testament to his commitment to continuous learning and improvement in the ever-evolving field of web development.
                </p>
                <p className="text-gray-700 mb-4">
                    Chirag aspires to become a distinguished web developer, recognized for creating innovative and user-centric applications. He views ExpenseEase not just as a completed project, but as a stepping stone towards mastering the intricacies of modern web development.
                </p>
                <p className="text-gray-700">
                    With a firm belief in the power of technology to simplify and enhance daily life, Chirag is excited about the future possibilities in web development. He is committed to refining his skills, embracing new technologies, and contributing meaningfully to the world of digital solutions.
                </p>
        </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}