/* Entry File: frontend/src/index.js */


import React from 'react';
import {createRoot} from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store';
import { restoreCSRF, csrfFetch } from './store/csrf';
import * as sessionActions from './store/session';
import { ModalProvider, Modal } from './context/Modal';

const store = configureStore();

if (process.env.NODE_ENV !== "production") {
  restoreCSRF();
  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
};

const Root = createRoot(document.getElementById('root'));

Root.render(
  <ModalProvider>
  <React.StrictMode>
    <ReduxProvider store={store}>
      <BrowserRouter>
        <App />
        <Modal />
      </BrowserRouter>
    </ReduxProvider>
  </React.StrictMode>
  </ModalProvider>
);
