import React, { ReactElement } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Login } from './components/LoginRegister/Login';
import { Register } from './components/LoginRegister/Register';
import { ReimbursementContainer } from './components/Reimbursement/ReimbursementContainer';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importing Bootstrap CSS globally
import { AddReimbursement } from './components/Reimbursement/AddReimbursement';
import { UsersContainer } from './components/User/UsersContainer';
import { store } from '../src/globalData/store';

// Wrapper component for protecting routes
function PrivateRoute({ element }: { element: ReactElement }) {
  const isLoggedIn = store.loggedInUser && store.loggedInUser.username;
  return isLoggedIn ? element : <Navigate to="/" />;
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route path="/reimbursements" element={<PrivateRoute element={<ReimbursementContainer />} />} />
          <Route path="/addreimbursement" element={<PrivateRoute element={<AddReimbursement />} />} />
          <Route path="/users" element={<PrivateRoute element={<UsersContainer />} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;