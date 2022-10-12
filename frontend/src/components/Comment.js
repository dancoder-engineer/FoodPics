import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function Comment(commentData) {

    const [userData, setUserData] = useState(null)


    useEffect(() => {
        fetch("/useravatar/"+commentData.commentData.user_id)
        .then(res => res.json())
        .then(data => {
            setUserData(data)
            console.log(data)
        })
    }, [])



    return(
        <div>

 {userData && (
          <div className="comment">
                  <div className="col1comm">
                        <img className="miniPicOnPostcomm" src={userData.avatar} /><br />
                        {userData.UserName}<br />
                    </div>
                     <div className="col2comm">
                      {commentData.commentData.content}
                      </div><br />
              </div>
 )}
            
            
        </div>
    )
}

export default Comment


//<NavLink to={("/user/"+userData.UserName)}>
//</NavLink>