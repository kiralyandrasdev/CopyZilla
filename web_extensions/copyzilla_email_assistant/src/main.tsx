import React from 'react';
import { createRoot } from 'react-dom/client';
import './main.css'
import App from './App'
import AuthContextProvider from './context/authContext';
import { initializeApp } from '@firebase/app';
import { getFirebaseConfig } from './config/firebaseConfig';
import AuthWrapper from './AuthWrapper';

async function initializeFirebase() {
  const firebaseConfig = await getFirebaseConfig();
  initializeApp(firebaseConfig!);
}

initializeFirebase();

createRoot(document.getElementById('root')!).render(
  <AuthContextProvider
    children={
      <AuthWrapper>
        <App />
      </AuthWrapper>
    }
  />
)
