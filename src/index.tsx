import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

import { store } from './redux/store';
import { Provider } from 'react-redux'


const rootElem = document.getElementById('root')

if (rootElem) {//существует ли роот эл
  const root = ReactDOM.createRoot(rootElem);

  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </React.StrictMode>
  );
}

