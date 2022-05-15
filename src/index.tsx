/* eslint-disable react/jsx-no-constructed-context-values */
import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import FirebaseContext from './context/firebase';
import './index.scss';
import './styles/main.scss';
import { store } from './redux/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
 firebase, analytics, FieldValue, storage
} from './lib/firebase';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <FirebaseContext.Provider value={{
        firebase, analytics, FieldValue, storage
      }}
      >
        <App />
      </FirebaseContext.Provider>
    </Provider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
