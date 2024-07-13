import React, { useState, useEffect, useRef } from "react";
import Login from './Login';
import Register from './Register';
import Header from "./Header";
import Footer from "./Footer";



const AuthLayout = () => {
    const [isLoginView, setIsLoginView] = useState(true);
    const [containerHeight, setContainerHeight] = useState('auto');
    const loginRef = useRef(null);
    const registerRef = useRef(null);


    useEffect(() => {
        const updateHeight = () => {
            const loginHeight = loginRef.current?.clientHeight;
            const registerHeight = registerRef.current?.clientHeight;
            setContainerHeight(Math.max(loginHeight, registerHeight, 400)); // 400px minimum height
        };

        updateHeight();
        window.addEventListener('resize', updateHeight);
        return () => window.removeEventListener('resize', updateHeight);
    }, []);

    const toggleView = () => {
        setIsLoginView(!isLoginView);
    };



    return (
        <div>
            <Header />
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="relative w-full max-w-3xl" style={{ height: `${containerHeight}px` }}>
                    <div className="flex absolute inset-0">
                        <div className={`w-1/2 bg-white rounded-l-lg shadow-md overflow-hidden transition-transform duration-1000 ease-in-out ${isLoginView ? '' : 'transform translate-x-full'}`}>
                            <div ref={loginRef} className={` h-full `}>
                                {isLoginView ? <LoginForm /> : <RegisterForm /> }
                            </div>
                        </div>
                        <div className={`w-1/2 bg-blue-500 rounded-l-lg shadow-md overflow-hidden transition-transform duration-1000 ease-in-out ${isLoginView ? '' : 'transform -translate-x-full'}`}>
                            <div ref={registerRef} className={`h-full `}>
                                {isLoginView ? <RegisterPrompt toggleView={toggleView} /> : <LoginPrompt toggleView={toggleView} /> }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

const LoginForm = () => (
    <div className="p-8 h-full flex flex-col justify-center">
        <h2 className="text-2xl mt-4 font-bold text-center">Login to Your Account</h2>
        <Login />
    </div>
);

const RegisterForm = () => (
    <div className="p-8 h-full flex flex-col justify-between">
        <h2 className="text-2xl font-bold mb-4 text-center">Create Your Account</h2>
        <Register />
    </div>
);

const LoginPrompt = ({ toggleView }) => (
    <div className="p-8 h-full flex flex-col justify-center items-center text-white">
        <h2 className="text-2xl font-bold mb-4">Welcome back!</h2>
        <p className="hidden md:block mb-4 text-center">Already a member of CashCompass? Log in now with your credentials to access your account and manage your finances.</p>
        <button onClick={toggleView} className="p-2 bg-transparent font-bold border-2 ring-1 ring-gray-200 rounded-md">SIGN IN</button>
    </div>
);

const RegisterPrompt = ({ toggleView }) => (
    <div className="p-8 h-full flex flex-col justify-center items-center text-white">
        <h2 className="text-2xl font-bold mb-4">Hello there!</h2>
        <p className="mb-4 hidden md:block text-center">New to CashCompass? Sign up now to unlock powerful features, personalized insights, and secure expense tracking. Join us and take the first step towards financial freedom!</p>
        <button onClick={toggleView} className="p-2 bg-transparent font-bold border-2 ring-1 ring-gray-200 rounded-md">SIGN UP</button>
    </div>
);

export default AuthLayout;