import React from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function TermsAndConditions() {
  return (
    <div className="flex flex-col min-h-screen">
                  <Header />
      <main className="flex-grow bg-gradient-to-b from-gray-100 to-white">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-indigo-600 mb-8 text-center">Terms and Conditions</h1>
          
          <div className="bg-white shadow-md rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold text-indigo-600 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700 mb-4">
              By accessing and using ExpenseEase, you accept and agree to be bound by the terms and provision of this agreement.
            </p>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold text-indigo-600 mb-4">2. Use of the Service</h2>
            <p className="text-gray-700 mb-4">
              You agree to use ExpenseEase only for purposes that are legal, proper and in accordance with these terms and any applicable laws or regulations.
            </p>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold text-indigo-600 mb-4">3. Privacy Policy</h2>
            <p className="text-gray-700 mb-4">
              Your use of ExpenseEase is also governed by our Privacy Policy. Please review our Privacy Policy, which also governs the site and informs users of our data collection practices.
            </p>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-indigo-600 mb-4">4. Disclaimer</h2>
            <p className="text-gray-700 mb-4">
              The information provided by ExpenseEase is for general informational purposes only. All information on the site is provided in good faith, however we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability or completeness of any information on the site.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}