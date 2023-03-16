import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AuthContextProvider from './context/authContext';
import AuthWrapper from './redirect/AuthWrapper';
import OptionsContextProvider from './features/compose/optionsContext';
import AppContextProvider from './context/appContext';
import { Provider } from 'react-redux';
import store from './store/store';
import UserContextProvider from './context/userContext';
import InitRedirect from './redirect/InitRedirect';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <AppContextProvider>
      <AuthContextProvider>
        <UserContextProvider>
          <OptionsContextProvider>
            <AuthWrapper>
              <InitRedirect>
                <App />
              </InitRedirect>
            </AuthWrapper>
          </OptionsContextProvider>
        </UserContextProvider>
      </AuthContextProvider>
    </AppContextProvider>
  </Provider>
);
