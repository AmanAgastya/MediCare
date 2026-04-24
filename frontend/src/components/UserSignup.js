import React, { useState } from 'react';
import { UserCircle, Mail, Lock, User, Phone } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import './UserSignup.css';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const UserSignup = () => {
  const [name, setName]                     = useState('');
  const [email, setEmail]                   = useState('');
  const [password, setPassword]             = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone]                   = useState('');
  const [error, setError]                   = useState('');
  const navigate = useNavigate();

  const validateForm = () => {
    if (!name.trim()) {
      setError('Name is required');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Invalid email address');
      return false;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return false;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (!/^\d{10}$/.test(phone)) {
      setError('Phone number must be 10 digits');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) return;

    try {
      const response = await fetch(`${API_BASE}/api/auth/signup`, {  // ✅ FIXED
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, phone }),
      });

      // ✅ Guard against HTML error pages (Render cold start / 502)
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        setError(
          response.status === 502 || response.status === 503
            ? 'Server is starting up. Please wait 30 seconds and try again.'
            : 'Server returned an unexpected response. Please try again.'
        );
        return;
      }

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userName', data.name);  // ✅ store name for Diagnosis.js
        navigate('/user-login');
      } else {
        setError(data.message || 'An error occurred during signup');
      }
    } catch (err) {
      console.error('Signup error:', err);
      setError('Cannot reach the server. Please check your connection and try again.');
    }
  };

  return (
    <div className="user-signup-container">
      <div className="user-signup-content">
        <UserCircle size={64} color="#4a90e2" />
        <h2>Patient / General User Sign Up</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <User size={20} color="#4a90e2" />
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <Mail size={20} color="#4a90e2" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <Lock size={20} color="#4a90e2" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength="8"
            />
          </div>
          <div className="input-group">
            <Lock size={20} color="#4a90e2" />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <Phone size={20} color="#4a90e2" />
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              pattern="\d{10}"
            />
          </div>
          <button type="submit" className="signup-button">Sign Up</button>
        </form>
        <div className="signup-footer">
          <p>Already have an account? <Link to="/user-login">Log in</Link></p>
          <Link to="/" className="back-link">Back to main login</Link>
        </div>
      </div>
    </div>
  );
};

export default UserSignup;
