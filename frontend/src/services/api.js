import axios from 'axios';

const API_URL = 'http://localhost:6767/api';

const authHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};


export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, userData );
    console.log('Register Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error while registering:', error);
    throw error;
  }
};

export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    console.log('Login Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error while logging in:', error.response ? error.response.data : error.message);
    throw error;
  }
};


export const getExpenses = async () => {
    try {
      const response = await axios.get(`${API_URL}/expenses`, { headers: authHeader() });
      console.log('API Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error in getExpenses:', error);
      throw error;
    }
};

export const createExpense = async (expenseData) => {
    try {
      const response = await axios.post(`${API_URL}/expenses`, expenseData,  { headers: authHeader() });
      return response.data;
    } catch (error) {
      console.error('Error creating expense:', error);
      throw error; // Re-throw the error so it can be caught in the component
    }
};

export const deleteExpense = async (id) => {
  console.log('Sending DELETE request for id:', id);
  try {
    const response = await axios.delete(`${API_URL}/expenses/${id}`, { headers: authHeader() });
    console.log('Delete response:', response);
    return response.data;
  } catch (error) {
    console.error('Error in deleteExpense:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const updateExpense = async (id, updatedexpense) => {
  console.log('Sending PUT request for id:', id);
  try {
    const response = await axios.patch(`${API_URL}/expenses/${id}`, updatedexpense, { headers: authHeader() });
    console.log('Update response:', response);
    return response;
  } catch (error) {
    console.error('Error in deleteExpense:', error.response ? error.response.data : error.message);
    throw error;
  }
};
