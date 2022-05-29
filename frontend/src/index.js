import React from "react";
import { createRoot } from 'react-dom/client';
import "./index.css";
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ModalProvider } from "./context/Modal";
import configureStore from "./store";
import { restoreCSRF, csrfFetch } from "./store/csrf";
import * as sessionActions from "./store/session";
import './index.css';

const reactContainer = document.getElementById('root');
const root = createRoot(reactContainer)

const store = configureStore();

if (process.env.NODE_ENV !== "production") {
  restoreCSRF();
  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
}

function Root() {
  return (
    <ReduxProvider store={store}>
      <ModalProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ModalProvider>
    </ReduxProvider>
  );
}

root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
);
