import React from 'react';
import { Navigate } from 'react-router';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import NavBar from './components/NavBar';
import Logout from './components/Logout';

import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import Companies from './pages/Companies';

import authService from './services/authService';

import './App.css';

function AppRouter() {
  const user: User | null = authService.getCurrentUser();

  return (
    <React.Fragment>
      <Router>
        <NavBar user={user} />
        <main className="container">
          <Routes>
            <Route path="/register" element={<Register user={user} />} />
            <Route path="/login" element={<Login user={user} />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/companies" element={<Companies user={user} />} />
            <Route path="/not-found" element={<NotFound />} />
            <Route path="/" element={<Navigate replace to="/companies" />} />
            <Route path="*" element={<Navigate replace to="/not-found" />} />
          </Routes>
        </main>
      </Router>
    </React.Fragment>
  );
}

export default AppRouter;
