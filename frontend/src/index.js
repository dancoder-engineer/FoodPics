import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Routes, Route} from "react-router-dom"

import MakeUser from './components/MakeUser.js'
import MakePost from './components/MakePost.js'
import Login from './components/Login.js'
import UsersPage from './components/UsersPage.js';
import Feed from './components/Feed.js'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Feed />} />
        <Route path='/register/' element={<MakeUser />} />
        <Route path='/newpost/' element={<MakePost />} />
        <Route path='/login/' element={<Login />} />
        <Route path='/user/:name' element={<UsersPage /> } />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
