import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from './Header.js'

function FollowingsPage({whichOne}) {

    
    const params = useParams()
    const [users, setUsers] = useState(null)
    const [message, setMessage] = useState(null)

    const history = useNavigate()

    
    

    useEffect(() => {
        grabUserList()
    },[])

    function grabUserList() {
        let urlBase = whichOne.split('page')[0]
        fetch("/" + urlBase + '/' + params.user)
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                makeMessage("fail")
            }
            else { 
                makeMessage("success")
                makeUsersList(data)
             }
        })
    }

    function makeMessage(state){ console.log(state, whichOne)
        if (state === "success"){
            if (whichOne === "followersof") { setMessage(<h1 className="centeredWithBg">{"Followers of " + params.user}</h1>)}
            if (whichOne === "followedby") { setMessage(<h1 className="centeredWithBg">{"Users Followed By " + params.user}</h1>)}
        }
    }


    function makeUsersList(data) { 
        let uData = data.map((i) => {
            return (<div>
            <div className="followeduser" id={i.UserName}>
              <div className="col1comm" id={i.UserName} onClick={toUser}>
                <img className="miniPicOnPostcomm" alt="" id={i.UserName} src={i.avatar} /><br />
                {i.UserName}<br />
              </div>
              <div className="col2comm">
                {i.description}
              </div><br />
            </div><br />
            </div>
        )})
        setUsers(uData)
    }

    function toUser(e) {
       // console.log(e.target.id)
       history('/user/' + e.target.id)
    }

    return(
        <div className="followingsPage">
            <img className="backImg" alt="" src="https://imgur.com/5b8Jev2.png" />
            <div className="headerHere"><Header /></div>
            <div className="individualUsers">
                <br />
                {message && message} <br />
                {users && users}
            </div><br /><br /><br /><br />
        </div>
    )
}

export default FollowingsPage

//<img className="backImg" src="https://imgur.com/YmGrKF5.png" />