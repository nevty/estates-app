import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import {createBrowserHistory} from "history";
import App from './App';
import store from "./redux/redux-store";
import './index.css';

ReactDOM.render(
    <BrowserRouter history={createBrowserHistory}>
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>
    , document.getElementById('root'));

