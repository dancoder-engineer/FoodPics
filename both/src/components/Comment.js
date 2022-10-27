import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Comment({commentData, resetUser}) {

    const [userData, setUserData] = useState(null)

    const history=useNavigate()


    useEffect(() => {
        fetch("/useravatar/"+commentData.user_id)
        .then(res => res.json())
        .then(data => {
            setUserData(data)
       //     console.log(data)
        })
    }, [])

    function toUser() {
        resetUser(userData.UserName)
    }

    return(
        <div>

 {userData && (
          <div className="comment">
                  <div className="col1comm" onClick={toUser}>
                        <img className="miniPicOnPostcomm" src={userData.avatar} /><br />
                        {userData.UserName}<br />
                    </div>
                     <div className="col2comm">
                      {commentData.content}
                      </div><br />
              </div>
 )}
            
            
        </div>
    )
}

export default Comment


//<NavLink to={("/user/"+userData.UserName)}>
//</NavLink>