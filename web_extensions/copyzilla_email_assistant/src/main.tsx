import React from 'react';
import { createRoot } from 'react-dom/client';
import './main.css'
import App from './App'
import AuthContextProvider from './context/authContext';
import { initializeApp } from '@firebase/app';
import { firebaseConfig } from './config/firebaseConfig';
import AuthWrapper from './AuthWrapper';

initializeApp(firebaseConfig);

createRoot(document.getElementById('root')!).render(
  <AuthContextProvider
    children={
      <AuthWrapper>
        <App />
      </AuthWrapper>
    }
  />
)
