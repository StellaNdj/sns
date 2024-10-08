import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './responsive.css';
import App from './App';
import { PostContextProvider } from './contexts/postContext';
import { AuthContextProvider } from './contexts/authContext';
import { ThemeContextProvider } from './contexts/themeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
    <ThemeContextProvider>
      <PostContextProvider>
        <App />
      </PostContextProvider>
    </ThemeContextProvider>
  </AuthContextProvider>
);
