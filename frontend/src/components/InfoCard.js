import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function InfoCard({data}) {

    let followButton = <button onClick={getFollowerFollowee}>Follow</button>
    let unfollowButton = <button onClick={deleteFollowing}>Unfollow</button>

    const [isFollowing, setIsFollowing] = useState(null)
    
    const [loggedIn, setloggedIn] = useState(null)

    const history = useNavigate()


    function checkLoggedin() {
        fetch("/getme/")
        .then(res => res.json())
        .then(data => {
            if (data.user) {  
                setloggedIn("true")
            }
        })
    }


    function getFollowerFollowee() {
        let followee = data.user.id

        
        fetch('/newFollowing/' + followee, {
                method: 'post'
            })
            .then(() => setIsFollowing(true))


    }

    function deleteFollowing() {
        let followee = data.user.id
//  post '/deleteFollowing/:followee', to: 'followings#deleteFollowing'
    fetch('/deleteFollowing/' + followee, {
    method: 'post'
    })
    .then(res => res.json())
    .then(setIsFollowing(false))

    }

    useEffect(() => {
        checkIfFollowing()
        checkLoggedin()
    }, [])

    function checkIfFollowing() {
        let followee = data.user.id
        fetch('/checkFollowing/' + followee)
        .then(res => res.json())
        .then(data => {
            if(data[0]) { setIsFollowing(true) }
            else { setIsFollowing(false) }
        })

    }


    function toFollows(e) {
        console.log(e.target.id)
        if (e.target.className === "columnThree") { history('/followedbypage/' + data.user.UserName) }
        else { history('/followersofpage/' + data.user.UserName) }
    }



    return(
             <div className="userData">
                <div className="threeColumns">
                    <span className="columnOne" onClick={toFollows} >
                        Followed by: {data.follow.followers}.
                    </span>

                    <span className="columnTwo">
                        {loggedIn && (
                            isFollowing ? unfollowButton : followButton                 
                        )}
                        </span>

                    <span className="columnThree" onClick={toFollows} >     
                        Follows: {data.follow.followees}.        
                    </span>

                    </div>
                     <h3 className="centered">{data.user.UserName}</h3>
                     <img className="avatarPic" src={data.avatar} /> 
                     <p className="centered">
                     Name: {data.user.ActualName} <br />
                     Pronouns: {data.user.Pronouns} <br />
                     Website: {data.user.Website} <br />
                     <br />
                     {data.user.Description}
                     </p>
                 </div>
    )
}

export default InfoCard