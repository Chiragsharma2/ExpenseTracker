import React from "react";
import { Link } from "react-router-dom";
import {  FaLinkedin, FaGithub } from "react-icons/fa6";
import { MdOutgoingMail } from "react-icons/md";

export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <p className="mb-2">chirag.sharma26262@gmail.com</p>
                    <p className="mb-2">Check me out:</p>
                    <div className="flex space-x-4">
                    <a href="https://github.com/Chiragsharma2" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-indigo-400">
                        <FaGithub />
                    </a>
                    <a href="https://linkedin.com/in/chirag-sharma-715a4121b" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-indigo-400">
                        <FaLinkedin />
                    </a>
                    </div>
                </div>
                <div>
                    <h2 className="text-2xl font-bold mb-2">Useful Links</h2>
                    <ul>
                    <li><Link to="/about" className="hover:text-indigo-400">About Us</Link></li>
                    <li><Link to="/terms" className="hover:text-indigo-400">Terms and Conditions</Link></li>
                    </ul>
                </div>
                <div>
                    <h2 className="text-2xl font-bold mb-2">Contact Us</h2>
                    <a href="mailto:chirag.sharma26262@gmail.com" className="flex items-center hover:text-indigo-400">
                    <MdOutgoingMail className="mr-2" />
                    email support
                    </a>
                </div>
                </div>
                <div className="mt-8 text-center text-sm">
                © 2023 ExpenseEase. All rights reserved.
                </div>
            </div>
        </footer>
    )
}