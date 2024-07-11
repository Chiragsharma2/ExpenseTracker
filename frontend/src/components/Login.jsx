import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';


export default function Login() {
    const [credentials, setCredentials] = useState({ username:'', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({...credentials, [name]: value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try{
            const response = await login(credentials);
            console.log('Login Response:', response);
            if (response.token) {
                localStorage.setItem('token', response.token);
                navigate('/dashboard');
            } else {
                setError('Login failed: No token received');
            }
        } catch (error) {
            console.error('Login failed:', error.response ? error.response.data : error);
            setError(error.response?.data?.message || 'An error occurred during login');        }
    };

    return (
        <form onSubmit={handleSubmit} className='flex flex-col gap-8  my-12 items-center justify-center'>
            {error && <div style={{ color: 'red'}}>{error}</div>}
            <input
                className='bg-gray-200 px-1 pb-1 w-full  leading-loose shadow-md '
                type="text"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                placeholder="enter username"
                required
            />
            <input
                className='bg-gray-200 px-1 py-1 w-full leading-loose shadow-md'
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                placeholder="password"
                required
            />
            <button type="submit" className='text-white font-bold bg-blue-400 rounded py-1 px-2 max-w-min align'>Login</button>

        </form>
    );
}