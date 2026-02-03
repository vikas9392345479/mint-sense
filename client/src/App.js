import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import GroupManager from './components/GroupManager';

function App() {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const token = localStorage.getItem('token');

  const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <Router>
      <div className="App" style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
        {/* Navigation Bar */}
        <nav style={{ 
          padding: '15px 30px', 
          background: '#1877f2', 
          color: '#fff', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <div style={{ fontSize: '20px', fontWeight: 'bold' }}>Mint-Sense Ledger</div>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            {token ? (
              <>
                <Link style={{ color: '#fff', textDecoration: 'none' }} to="/dashboard">Dashboard</Link>
                <button onClick={logout} style={{ 
                  background: '#ff4d4d', 
                  color: 'white', 
                  border: 'none', 
                  padding: '8px 15px', 
                  borderRadius: '5px', 
                  cursor: 'pointer' 
                }}>Logout</button>
              </>
            ) : (
              <>
                <Link style={{ color: '#fff', textDecoration: 'none' }} to="/login">Login</Link>
                <Link style={{ color: '#fff', textDecoration: 'none' }} to="/register">Register</Link>
              </>
            )}
          </div>
        </nav>

        {/* Main Content Area */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            <Route path="/dashboard" element={
              token ? (
                <div style={{ display: 'flex', gap: '30px', alignItems: 'flex-start' }}>
                  {/* Left Column: Group List & Management */}
                  <div style={{ flex: '1', minWidth: '300px' }}>
                    <GroupManager onGroupSelect={(group) => setSelectedGroup(group)} />
                  </div>

                  {/* Right Column: Active Group Expenses & Splits */}
                  <div style={{ flex: '2', background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                    {selectedGroup ? (
                      <Dashboard selectedGroup={selectedGroup} />
                    ) : (
                      <div style={{ textAlign: 'center', padding: '50px', color: '#65676b' }}>
                        <h3>Welcome to Mint-Sense</h3>
                        <p>Select a group from the sidebar to view balances or create a new group to start splitting expenses.</p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <Navigate to="/login" />
              )
            } />

            <Route path="/" element={<Navigate to="/dashboard" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;