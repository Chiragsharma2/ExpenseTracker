import axios from 'axios';

const api_url = import.meta.env.VITE_API_URL;

const authHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};


export const register = async (userData) => {
  try {
    console.log('API URL:', api_url);
    const response = await axios.post(`${api_url}/auth/register`, userData );
    console.log('Register Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error while registering:', error);
    throw error;
  }
};

export const login = async (credentials) => {
  try {
    console.log('API URL:', api_url);
    const response = await axios.post(`${api_url}/auth/login`, credentials);
    console.log('Login Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error while logging in:', error.response ? error.response.data : error.message);
    throw error;
  }
};


export const getExpenses = async () => {
    try {
      console.log('API URL:', api_url);
      const response = await axios.get(`${api_url}/expenses`, { headers: authHeader() });
      console.log('API Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error in getExpenses:', error);
      throw error;
    }
};

export const createExpense = async (expenseData) => {
    try {
      console.log('API URL:', api_url);
      const response = await axios.post(`${api_url}/expenses`, expenseData,  { headers: authHeader() });
      return response.data;
    } catch (error) {
      console.error('Error creating expense:', error);
      throw error; // Re-throw the error so it can be caught in the component
    }
};

export const deleteExpense = async (id) => {
  console.log('API URL:', api_url);
  console.log('Sending DELETE request for id:', id);
  try {
    const response = await axios.delete(`${api_url}/expenses/${id}`, { headers: authHeader() });
    console.log('Delete response:', response);
    return response.data;
  } catch (error) {
    console.error('Error in deleteExpense:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const updateExpense = async (id, updatedexpense) => {
  console.log('API URL:', api_url);
  console.log('Sending PUT request for id:', id);
  try {
    const response = await axios.patch(`${api_url}/expenses/${id}`, updatedexpense, { headers: authHeader() });
    console.log('Update response:', response);
    return response;
  } catch (error) {
    console.error('Error in deleteExpense:', error.response ? error.response.data : error.message);
    throw error;
  }
};
