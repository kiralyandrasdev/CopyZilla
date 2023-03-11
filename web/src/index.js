import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import App from './App';
import { UserContextProvider } from './features';
import { AuthContextProvider } from './features/authentication/authContext';
import './index.css';
import store from './redux/store/store';
import reportWebVitals from './reportWebVitals';
import RouteChangeTracker from './redirect/RouteChangeTracker';
import TemplateContextProvider from './features/templates/templateContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <AuthContextProvider>
        <UserContextProvider>
          <TemplateContextProvider>
            <RouteChangeTracker>
              <App></App>
            </RouteChangeTracker>
          </TemplateContextProvider>
        </UserContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();