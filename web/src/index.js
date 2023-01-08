import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  RouterProvider,
  createBrowserRouter
} from "react-router-dom";
import App from './App';
import { AuthContextProvider } from './features';
import './index.css';
import reportWebVitals from './reportWebVitals';
// import Root from './routes/Root';

/* const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
  },
]); */

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider value={null}>
        <App></App>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
