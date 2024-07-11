import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from './components/Home';
import AuthLayout from './components/AuthLayout';
import Register from './components/Register';
import ExpenseList from "./components/ExpenseList";

function ProtectedRoute({ children }){
  const token = localStorage.getItem('token');
  if(!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}


function App() {
   
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<AuthLayout />} />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/dashboard"
            element={
              <ProtectedRoute>
                <ExpenseList />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    )
  }
  
  export default App