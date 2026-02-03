import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password
      });

      // 1. Store the token
      localStorage.setItem('token', res.data.token);

      alert("Login Successful!");

      // 2. Redirect and refresh to update the App.js state
      window.location.href = '/dashboard';
      
    } catch (err) {
      console.error(err.response?.data);
      alert(err.response?.data?.message || "Login Failed. Please check your credentials.");
    }
  };

  return (
    <div style={{ 
      maxWidth: '400px', 
      margin: '100px auto', 
      padding: '30px', 
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)', 
      borderRadius: '10px',
      backgroundColor: '#fff'
    }}>
      <h2 style={{ textAlign: 'center', color: '#1877f2', marginBottom: '20px' }}>Login to Mint-Sense</h2>
      <form onSubmit={onSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Email Address</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            required
            placeholder="enter your email"
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            required
            placeholder="enter your password"
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd', boxSizing: 'border-box' }}
          />
        </div>
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '12px',
            background: '#1877f2',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Login
        </button>
      </form>
      <p style={{ textAlign: 'center', marginTop: '15px', fontSize: '13px' }}>
        Don't have an account? <a href="/register" style={{ color: '#1877f2', textDecoration: 'none' }}>Register here</a>
      </p>
    </div>
  );
};

export default Login;