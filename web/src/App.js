import React from 'react';
import { Route, Router, Routes } from 'react-router-dom';
import './App.css';
import { EditorContext, EditorContextProvider } from './features';
import Layout from './layout/Layout';
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
      <Route element={<Layout id="fixed-layout" headerId="home-header" />} path="/user">
        <Route path="/user/home" element=
          {
            <ErrorBoundary>
              <EditorContextProvider>
                <Home />
              </EditorContextProvider>
            </ErrorBoundary>
          } />
      </Route>
      <Route element={<Layout id="fixed-layout" />} path="/auth">
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />
      </Route>
      <Route element={<Layout headerId="landing-header" footerId="landing-footer" />}>
        <Route path="/" element={<Landing />} />
      </Route>
    </Routes>
  );
}

export default App;