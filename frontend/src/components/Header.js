import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Header(){

    const [seeNotifications, setSeeNotifications] = useState("↓")
    const [notificationBar, setNotificationBar] = useState(null)
    const [notifications, setNotifications] = useState(null)
   const [notificationMessage, setNotificationMessage] = useState("Notifications")
    const [userInfo, setUserInfo] = useState(null)
    const history = useNavigate()

   

//    const userDiv = 

    const login = <NavLink to="/login/"><img className="headerPic" src="https://imgur.com/TSwaxAl.png" /></NavLink>
    const logout = <NavLink to="/logout/"><img className="headerPic" src="https://imgur.com/JO1znon.png" /></NavLink>
    const register = <NavLink to="/register/"><img className="headerPic" src="https://imgur.com/aaxS2Gq.png" /></NavLink>
    const newPost = <NavLink to="/newpost/"><img className="headerPic" src="https://imgur.com/1p7Otp1.png" /></NavLink>
    const home = <NavLink to="/"><img className="headerPic" src="https://imgur.com/dWFT3ma.png" /></NavLink>
    const modifySelf = <NavLink to="/editUser/"><img className="headerPic" src="https://imgur.com/DOCcBDY.png" /></NavLink>
    const messages = <NavLink to="/privatemessages/"><img className="headerPic" src="https://imgur.com/DOCcBDY.png" /></NavLink>

    const search = (<div></div>)





    useEffect(() => {
        fetch("/getme/")
        .then(res => res.json())
        .then(data => { 
            if (data.user) { 
                setUserInfo(data)
            }
            if(data.notifications[0]) { makeNotifications(data.notifications)
             }
            else { 
                setNotificationBar("↓")
                setSeeNotifications("↓")
                }
        })
    }, [])

    function makeNotifications(nots) {

        nots = nots.reverse()
        if (nots.length >= 5) { nots = nots.slice(0, 5) }
        if (nots[0].read === "unread") {
            setNotificationMessage ("You have new notifications")
        }                
        setNotificationBar("centered")
        setNotifications(nots.map((i, index) => {
            return <p id={i.whichpost} onClick={notificationClick} key={index}>{i.content}</p>
       }))

    }

    function notificationClick(e) { 

        if (e.target.id === "0") {
            history('/privatemessages/')
        }
        else {
            history('localhost:5000/posts/' + e.target.id)
        }
    }

    function switchNotifications() { 
        fetch("/readall/")
        .then(setNotificationMessage("Notifications"))

        if (seeNotifications === "↓") { setSeeNotifications("↑") }
        else { setSeeNotifications("↓") }
    }



    return(
        <div className="overHeader">
            <div className="header">
                <h1 className="centered">FoodBook</h1>
                <div className="headerCentered">
                {userInfo ? logout : login} {userInfo ? home : register} {userInfo ? newPost : null} {userInfo ? modifySelf : null} {userInfo ? messages : null}
                </div>
                <br />
                <h3 className={notificationBar} onClick={switchNotifications}>{seeNotifications}{notificationMessage}{seeNotifications}</h3>
                <div className={seeNotifications}>
                    {notifications && notifications}
                </div>
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