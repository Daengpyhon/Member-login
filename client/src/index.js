import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'antd/dist/antd.css'
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
// Redux
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension'
import rootReducer from './components/reducer';

const store = createStore(rootReducer, composeWithDevTools())

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  // <React.StrictMode>
   
    <Provider store={store}>
    <ToastContainer position='top-right' autoClose="5000"/>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </Provider>
   // </React.StrictMode> 
);

