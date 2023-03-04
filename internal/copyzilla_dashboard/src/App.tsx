import React from 'react';
import './App.css';
import UserListPage from './pages/user_list/UserListPage';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './pages/layout/Layout';
import LogListPage from './pages/log_list/LogListPage';
import { initializeApp } from "firebase/app";
import { firebaseConfig } from './config/firebaseConfig';
import SignInPage from './pages/sign_in/SignInPage';
import AuthRedirect from './redirect/AuthRedirect';

initializeApp(firebaseConfig);

function App() {
  return (
    <Routes>
      <Route element={<AuthRedirect />}>
        <Route element={<Layout />}>
          <Route path="/dashboard/users" element={<UserListPage />} />
          <Route path="/dashboard/logs" element={<LogListPage />} />
        </Route>
        <Route path="/login" element={<SignInPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
