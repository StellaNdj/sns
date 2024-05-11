import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { useAuthContext } from './hooks/useAuthContext';
import './DarkMode.css';
import { useThemeContext } from './hooks/useThemeContext';
import Profile from './pages/Profile';
import PostView from './pages/PostView';


function App() {
  const { user } = useAuthContext();
  const { darkTheme } = useThemeContext();

  return (
    <div className={darkTheme ? 'App darkMode' : 'App'}>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={
              user ? (
              <>
                <Navbar/>
                <Homepage />
              </>
              ) : (<Navigate to="/login"/>)
            } />
          <Route
            path='/:username'
            element={
              user ? (
                <>
                  <Navbar/>
                  <Profile/>
                </>
              ) : (<Navigate to="/login"/>)
            }
          />
          <Route
            path='/postUsername/post/:id'
            element={
              user ? (
                <>
                  <Navbar/>
                  <PostView/>
                </>
              ) : (<Navigate to="/login"/>)
            }
          />
          <Route
            path='/signup'
            element={!user ? <Signup/> : <Navigate to="/"/> }/>
          <Route
            path='/login'
            element={!user ? <Login/> : <Navigate to="/"/> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
