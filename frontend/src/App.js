import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom"


import MakeUser from './components/MakeUser.js'
import MakePost from './components/MakePost.js'
import Login from './components/Login.js'
import UsersPage from './components/UsersPage.js';
import Feed from './components/Feed.js'

function App() {


  return (
    
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Feed />} />
        <Route path='/register/' element={<MakeUser />} />
        <Route path='/newpost/' element={<MakePost />} />
        <Route path='/login/' element={<Login />} />
        <Route path='/user/:name' element={<UsersPage /> } />
      </Routes>
    </BrowserRouter>
    
  
  );
  
}

export default App;
