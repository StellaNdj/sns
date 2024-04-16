import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { useAuthContext } from './hooks/useAuthContext';

function App() {
  const { user } = useAuthContext();

  return (
    <div className="App">
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
