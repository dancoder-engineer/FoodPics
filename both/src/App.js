import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom"


import MakeUser from './components/MakeUser.js'
import MakePost from './components/MakePost.js'
import Login from './components/Login.js'
import Logout from './components/Logout.js'
import UsersPage from './components/UsersPage.js';
import Feed from './components/Feed.js'
import EditUser from './components/EditUser.js'
import PostsByTag from './components/PostsByTag';
import FollowingsPage from './components/FollowingsPage.js';
import PrivateMessageList from './components/PrivateMessageList.js'
import MessageThread from './components/MessageThread.js'
import OnePost from './components/OnePost.js'

function App() {


  return (
    
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Feed />} />
        <Route path='/register/' element={<MakeUser />} />
        <Route path='/newpost/' element={<MakePost />} />
        <Route path='/login/' element={<Login />} />
        <Route path='/logout/' element={<Logout />} />
        <Route path='/user/:name' element={<UsersPage /> } />
        <Route path='/edituser/' element={<EditUser />} />
        <Route path='/postsbytag/:tag' element={<PostsByTag />} />
        <Route path='/followedbypage/:user' element={<FollowingsPage whichOne="followedby" />} />
        <Route path='/followersofpage/:user' element={<FollowingsPage whichOne="followersof" />} />
        <Route path='/privatemessages' element={<PrivateMessageList />} />
        <Route path='/messagethread/:id' element={<MessageThread />} />
        <Route path='/onepost/:id' element={<OnePost />} />
      </Routes>
    </BrowserRouter>
    
  
  );
  
}

export default App;
