import React, { useContext, useEffect } from 'react';
import './App.css';
import { AuthContext } from './context/authContext';
import SignedInView from './views/SignedInView';
import SignedOutView from './views/SignedOutView';
import { initializeApp } from "firebase/app";
import { firebaseConfig } from './config/firebaseConfig';
import { AppContext, AppState } from './context/appContext';
import SnackBar from './views/SnackBar';
import SplashView from './views/SplashView';
import VerifyEmailView from './views/VerifyEmailView';

initializeApp(firebaseConfig);

function App() {
  const { user } = useContext(AuthContext);
  const { appState, snackBarMessage, clearSnackBarMessage } = useContext(AppContext);

  useEffect(() => {
    if (snackBarMessage) {
      setTimeout(() => {
        clearSnackBarMessage();
      }, 3000);
    }
  }, [snackBarMessage]);

  const view = () => {
    if (appState === AppState.Splash) {
      return <SplashView />
    }

    if (appState === AppState.EmailNotVerified) {
      return <VerifyEmailView />
    }

    if (appState === AppState.SignedIn) {
      return <SignedInView />
    }

    return <SignedOutView />
  }

  return (
    <div className="app">
      {view()}
      {snackBarMessage && <SnackBar />}
    </div>
  );
}

export default App;
