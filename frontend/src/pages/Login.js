import React from 'react';
import { useState } from 'react';
import { useLogin } from '../hooks/useLoginContext';
import { Link } from 'react-router-dom';
import './pages css/Forms.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  }

  const logURL = `${process.env.REACT_APP_BACKEND_URL}/api/user/login`;
  console.log(logURL);
  
  return(
    <div className="form-container">
      <div className="form-left-side"></div>
      <div className="form-right-side">
        <div className="form">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <label>Email</label>
            <input
              type='email'
              onChange={(e) => setEmail(e.target.value)}
              value={email}/>
            <label>Password</label>
            <input
              type='password'
              onChange={(e) => setPassword(e.target.value)}
              value={password}/>
            <button disabled={loading}>Log in</button>
          </form>
          <p className="form-redirect">You don't have an account ? <Link to='/signup'>Sign up</Link></p>
          {error && <div className="notice">{error}</div>}
        </div>
      </div>
    </div>
  )
};

export default Login;
