import React from 'react';
import { Route, Router, Routes } from 'react-router-dom';
import './App.css';
import { EditorContext, EditorContextProvider } from './features';
import Layout from './layout/Layout';
import LandingLayout from './layout/LandingLayout'
import Home from './pages/Home';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ErrorBoundary from './utils/ErrorBoundary';

function App() {
  return (
    <Routes>
      {/*  <Route element={<PrivateRoutes />}>
        <Route path="/user" element={<Layout id="fixed-layout" />}>
          <Route path="/user/home" element={<EditorForm />} />
        </Route>
      </Route> */}
      <Route element={<Layout />} path="/user">
        <Route path="/user/home" element=
          {
            <ErrorBoundary>
              <EditorContextProvider>
                <Home />
              </EditorContextProvider>
            </ErrorBoundary>
          } />
      </Route>
      <Route element={<Layout />} path="/auth">
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />
      </Route>
      <Route element={<LandingLayout />}>
        <Route path="/" element={<Landing />} />
      </Route>
    </Routes>
  );
}

export default App;