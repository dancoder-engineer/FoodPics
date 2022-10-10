import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { setUser } from "./Redux/userSlice";

function Header(){

    const [userInfo, setUserInfo] = useState(null)
    const history = useNavigate()

    const login = <NavLink to="/login/"> <img className="headerPic" src="https://imgur.com/TSwaxAl.png" /> </NavLink>
    const logout = <NavLink to="/logout/"> <img className="headerPic" src="https://imgur.com/JO1znon.png" /> </NavLink>
    const register = <NavLink to="/register/"> <img className="headerPic" src="https://imgur.com/aaxS2Gq.png" /> </NavLink>
    const newPost = <NavLink to="/newpost/">New Post</NavLink>
    const home = <NavLink to="/">Home</NavLink>
    

    const search = (<div></div>)

    function clickLogout() {
   //     setUserInfo(null)
        history("/logout/")
    }




    useEffect(() => {
    //    if (loginPage==="false") {
            fetch("/getme/")
        .then(res => res.json())
        .then(data => { console.log(data)
            if (data.user) { 
                setUserInfo(data)
            }
        })
    //}
        // else {
        //     setUserInfo(null)
        // }
    }, [])



    return(
        <div className="header">
            <h1>{userInfo && userInfo.user.UserName}</h1>
            {userInfo ? logout : login} {userInfo ? home : register} {userInfo ? newPost : null}
        </div>
    )
}
export default Header


// <Route path='/' element={<Feed />} />
// <Route path='/register/' element={<MakeUser />} />
// <Route path='/newpost/' element={<MakePost />} />
// <Route path='/login/' element={<Login />} />
// <Route path='/user/:name' element={<UsersPage /> } />