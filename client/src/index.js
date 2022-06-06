import React from "react";
import ReactDOM from "react-dom";

import {BrowserRouter,Routes,Route,} from "react-router-dom"
import { Provider } from 'react-redux'


import App from "./App";
import "./index.css";

import { store } from './store/store'
import reportWebVitals from "./reportWebVitals";

import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

axios.defaults.baseURL = process.env.REACT_APP_API || 'http://localhost:3001'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<App />}/>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,

  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
