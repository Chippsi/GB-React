import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import './index.sass';
import Routes from './routes/Routes';
import { persistor, store } from './store/store'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Routes />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
