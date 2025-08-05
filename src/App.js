import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Pricing from './pages/Pricing';
import Storage from './pages/Storage';
import ChatAI from './pages/ChatAI';
import Security from './pages/Security';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import './styles/App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <div className="App">
      <Navbar 
        isAuthenticated={isAuthenticated} 
        user={user} 
        onLogout={handleLogout}
      />
      <main className="main-content">
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/security" element={<Security />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register onRegister={handleLogin} />} />
          
          {/* Rutas protegidas */}
          <Route 
            path="/storage" 
            element={
              isAuthenticated ? 
              <Storage user={user} /> : 
              <Login onLogin={handleLogin} />
            } 
          />
          <Route 
            path="/chat-ai" 
            element={
              isAuthenticated ? 
              <ChatAI user={user} /> : 
              <Login onLogin={handleLogin} />
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              isAuthenticated ? 
              <Dashboard user={user} /> : 
              <Login onLogin={handleLogin} />
            } 
          />
        </Routes>
      </main>
    </div>
  );
}

export default App; 