import { initializeApp } from 'firebase/app';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { firebaseConfig } from './config/firebaseConfig';
import { EditorContextProvider } from './features';
import AuthLayout from './layout/AuthLayout';
import LandingLayout from './layout/LandingLayout';
import Layout from './layout/Layout';
import Account from './pages/Account';
import AccountRecovery from './pages/AccountRecovery';
import Home from './pages/Home';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ErrorBoundary from './utils/ErrorBoundary';
import PrivateRoutes from './utils/PrivateRoutes';

function App() {
  initializeApp(firebaseConfig);
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route element={<Layout />} path="/user">
          <Route path="/user/editor" element=
            {
              <ErrorBoundary>
                <Home />
              </ErrorBoundary>
            }
          />
          <Route path="/user/account" element=
            {
              <ErrorBoundary>
                <Account />
              </ErrorBoundary>
            }
          />
        </Route>
      </Route>
      <Route element={<AuthLayout />} path="/auth">
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/auth/accountRecovery" element={<AccountRecovery />} />
      </Route>
      <Route element={<LandingLayout />}>
        <Route path="/" element={<Landing />} />
      </Route>
    </Routes>
  );
}

export default App;