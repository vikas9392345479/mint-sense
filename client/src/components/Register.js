import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const { name, email, password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      // This sends the data to your backend on port 5000
      const res = await axios.post('http://localhost:5000/api/auth/register', formData);
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'Arial' }}>
      <h1>MintSense</h1>
      <h3>Create Your Account</h3>
      <form onSubmit={onSubmit} style={{ maxWidth: '300px', margin: '0 auto' }}>
        <input type="text" placeholder="Full Name" name="name" value={name} onChange={onChange} required style={{display: 'block', width: '100%', margin: '10px 0', padding: '10px'}} /><br/>
        <input type="email" placeholder="Email Address" name="email" value={email} onChange={onChange} required style={{display: 'block', width: '100%', margin: '10px 0', padding: '10px'}} /><br/>
        <input type="password" placeholder="Password" name="password" value={password} onChange={onChange} required style={{display: 'block', width: '100%', margin: '10px 0', padding: '10px'}} /><br/>
        <button type="submit" style={{width: '100%', padding: '10px', background: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer'}}>Register</button>
      </form>
    </div>
  );
};

export default Register;