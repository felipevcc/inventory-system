import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Home from './components/Home';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<MainLayout />} />
        </Routes>
      </div>
    </Router>
  );
}

const MainLayout = () => {
  return (
    <>
      <Sidebar />
      <div className="main-content">
        <Routes>
          <Route path="/home" element={<Home />} />
          {/* Other paths with its components */}
        </Routes>
      </div>
    </>
  );
}

export default App;
