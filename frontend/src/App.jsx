import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from './components/Home';
import AuthLayout from './components/AuthLayout';
import Dashboard from "./components/Dashboard";
import AboutUs from "./components/AboutUs";
import TermsAndConditions from "./components/TermsAndConditions";

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
          <Route path="/about" element={< AboutUs/>} />
          <Route path="/terms" element={< TermsAndConditions/>} />
          <Route 
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    )
  }
  
  export default App