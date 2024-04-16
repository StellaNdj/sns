import React from 'react';
import { useState } from 'react';
import { useSignup } from '../hooks/useSignupContext';
import { Link } from 'react-router-dom';
import './pages css/Forms.css';

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const { signup, loading, error } = useSignup();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(firstName, lastName, email, password, username);
  }

  return(
    <div className="form-container">
      <div className="form-left-side"></div>
      <div className="form-right-side">
        <div>
          <h2>Sign up</h2>
          <form onSubmit={handleSubmit}>
            <label>First name</label>
            <input
              type='text'
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
                />
            <label>Last name</label>
            <input
              type='text'
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
                />
            <label>Email</label>
            <input
              type='text'
              onChange={(e) => setEmail(e.target.value)}
              value={email}
                />
            <label>Password</label>
            <input
              type='text'
              onChange={(e) => setPassword(e.target.value)}
              value={password}
                />
            <label>Username</label>
            <input
              type='text'
              onChange={(e) => setUsername(e.target.value)}
              value={username}
                />
            <button disabled={loading}>Sign up</button>
          </form>
          <p className="form-redirect">Already have an account ? <Link to='/login'>Sign in</Link></p>
          {error && <div className="notice">{error}</div>}
        </div>
      </div>
    </div>
  )
}

export default Signup;
