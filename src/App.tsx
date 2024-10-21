import './App.css';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import Dashboard from './pages/dashboard';

function App() {
  return (
    <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <Dashboard />
                    }
                />
            </Routes>
      </BrowserRouter>
  );
}

export default App;
