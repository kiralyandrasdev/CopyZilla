import { initializeApp } from 'firebase/app';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { firebaseConfig } from './config/firebaseConfig';
import PrivateLayout from './layout/PrivateLayout';
import PublicLayout from './layout/PublicLayout';
import Account from './pages/Account';
import AccountRecovery from './pages/AccountRecovery';
import CreatePage from './pages/Create';
import CreditRefill from './pages/CreditRefill';
import Landing from './pages/Landing';
import Login from './pages/Login';
import SavedResultsPage from './pages/SavedResults';
import Signup from './pages/Signup';
import CheckoutCanceled from './pages/checkout/CheckoutCancelled';
import CheckoutCompleted from './pages/checkout/CheckoutCompleted';
import PrivateRoutes from './utils/PrivateRoutes';

function App() {
  initializeApp(firebaseConfig);
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route element={<PrivateLayout />} path="/user">
          <Route path="/user/editor" element=
            {
              <CreatePage />
            }
          />
          <Route path="/user/savedResults" element=
            {
              <SavedResultsPage />
            }
          />
          <Route path="/user/account" element=
            {
              <Account />
            }
          />
          <Route path="/user/creditRefill" element=
            {
              <CreditRefill />
            }
          />
          <Route path="/user/checkout/completed" element=
            {
              <CheckoutCompleted />
            }
          />
          <Route path="/user/checkout/canceled" element=
            {
              <CheckoutCanceled />
            }
          />
        </Route>
      </Route>
      <Route element={<PublicLayout />} path="/auth">
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/auth/accountRecovery" element={<AccountRecovery />} />
      </Route>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Landing />} />
      </Route>
    </Routes>
  );
}

export default App;