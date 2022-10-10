import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { setUser } from "./Redux/userSlice";

function Header({loginPage}){

    const [userInfo, setUserInfo] = useState(null)
    const history = useNavigate()

    const login = (<div>
        <NavLink to="/login/">Login</NavLink>
    </div>)

    const logout = (<div onClick={clickLogout}>
        Logout
    </div>)

    const register = (<div>
        <NavLink to="/register/">Register</NavLink>
    </div>)

    const newPost = (<div>
        <NavLink to="/newpost/">New Post</NavLink>
    </div>)

    const home = (<div>
        <NavLink to="/">Home</NavLink>
    </div>)

    const search = (<div></div>)

    function clickLogout() {
        setUserInfo(null)
        history("/logout/")
    }




    useEffect(() => {
        if (loginPage==="false")
        {
            fetch("/getme/")
        .then(res => res.json())
        .then(data => { console.log(data)
            if (data.user) { 
                setUserInfo(data)
            }
        })}
        else {
            setUserInfo(null)
        }
    }, [])



    return(
        <div className="header">
            <h1>{userInfo && userInfo.user.UserName}</h1>
            {userInfo ? logout : login}
            {userInfo ? home : register}
            {userInfo ? newPost : null}
        </div>
    )
}
export default Header


// <Route path='/' element={<Feed />} />
// <Route path='/register/' element={<MakeUser />} />
// <Route path='/newpost/' element={<MakePost />} />
// <Route path='/login/' element={<Login />} />
// <Route path='/user/:name' element={<UsersPage /> } />