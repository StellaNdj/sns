import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar';
import Homepage from './pages/Homepage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={
              <>
                <Navbar/>
                <Homepage />
              </>
            } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
