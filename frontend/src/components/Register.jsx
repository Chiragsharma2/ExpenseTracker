import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/api';


export default function Register() {
    const [userData, setUserData] = useState({ username:'', password: '', email: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({...userData, [name]: value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await register(userData);
            console.log('Registration response:', response);
            localStorage.setItem('token', response.token);
            navigate('/dashboard');
        } catch (error) {
            console.error('Register failed:', error.response ? error.response.data : error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className='flex flex-col gap-6 mx-3 my-8 items-center justify-center'>
            <input
                className='bg-gray-200 px-1 py-1 w-full  leading-loose shadow-md line'
                type="text"
                name="username"
                value={userData.username}
                onChange={handleChange}
                placeholder="username"
                required
            />
            <input
                className='bg-gray-200 px-1 py-1 w-full  leading-loose shadow-md line'
                type="password"
                name="password"
                value={userData.password}
                onChange={handleChange}
                placeholder="password"
                required
            />
            <input
                className='bg-gray-200 px-1 py-1 w-full  leading-loose shadow-md line'
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                placeholder="email"
                required
            />
            <button type="submit" className='text-white font-bold bg-blue-400 rounded py-1 px-2 max-w-min align'>Register</button>

        </form>
    );
}