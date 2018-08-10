import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app';
import registerServiceWorker from './registerServiceWorker';
import { createStore ,applyMiddleware} from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
import { PersistGate } from 'redux-persist/integration/react'
import socketMiddleware from './socketMiddleware'
import rootReducer from './reducers'

const persistConfig = {
  key: 'root',
  storage,
}
const persistedReducer = persistReducer(persistConfig, rootReducer)
let store = createStore(persistedReducer,applyMiddleware(thunk,socketMiddleware))
let persistor = persistStore(store)

ReactDOM.render(
 <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>, document.getElementById('root'));
registerServiceWorker();
