import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { setUser } from "./Redux/postSlice";

function Header(){

    const [userInfo, setUserInfo] = useState(null)
    const history = useNavigate()

//    const userDiv = 

    const login = <NavLink to="/login/"><img className="headerPic" src="https://imgur.com/TSwaxAl.png" /></NavLink>
    const logout = <NavLink to="/logout/"><img className="headerPic" src="https://imgur.com/JO1znon.png" /></NavLink>
    const register = <NavLink to="/register/"><img className="headerPic" src="https://imgur.com/aaxS2Gq.png" /></NavLink>
    const newPost = <NavLink to="/newpost/"><img className="headerPic" src="https://imgur.com/1p7Otp1.png" /></NavLink>
    const home = <NavLink to="/"><img className="headerPic" src="https://imgur.com/dWFT3ma.png" /></NavLink>
    

    const search = (<div></div>)





    useEffect(() => {
        fetch("/getme/")
        .then(res => res.json())
        .then(data => {
            if (data.user) { 
                setUserInfo(data)
            }
        })
    }, [])



    return(
        <div className="overHeader">
            <div className="header">
                <h1 className="centered">FoodBook</h1>
                <div className="headerCentered">
                {userInfo ? logout : login} {userInfo ? home : register} {userInfo ? newPost : null}
                </div>
                <br />
            </div>
        </div>
    )
}
export default Header



// {userInfo && (
//     <div className="userInfo">
//        <div className="col1"><NavLink to="/"><img className="miniPicOnPost" src={userInfo.avatar} /></NavLink></div>
//        <div className="col2">
//             <NavLink to={"/"}><br />
//                {userInfo.user.UserName}<br />
//            </NavLink>
//        </div><br />
//    </div>
// )}