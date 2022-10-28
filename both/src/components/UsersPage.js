import React, { useEffect, useState } from "react";
import {useNavigate, useParams} from 'react-router-dom'
import InfoCard from "./InfoCard.js";
import Header from "./Header.js";

import Post from './Post.js'

function UsersPage() {
    const params = useParams()
    
    const [userInfo, setUserInfo] = useState(null)
    const [postData, setPostData] = useState([])

    const history=useNavigate()
   


    useEffect(() => {
        setStates()
    }
  , [])

  useEffect(() => {
    setStates()
  }, [params.name])


  function resetTags(tag) {
    history('/postsbytag/'+tag)
}

    function setStates(user=params.name) {
        setUserInfo(null)
        getPostNums(null)
        fetch('/userid/' + user)
        .then(res => res.json())
        .then(data => {
            if(data.error) {
                setUserInfo(<h1 className="centeredAndNice">User {params.name} doesn't exist..</h1>)
            }
            setUserInfo(<InfoCard data={data} />)
            getPostNums(data.user.id)
            if (user !== params.name) {history('/user/'+user)}
        })
    }



    function getPostNums(id) {
        fetch('/userposts/' + id)
        .then(res => res.json())
        .then(data => { 
            setPostData(data.posts.map((i, index) => 
                (
                <div key={index}>
                    <Post resetUser={setStates} resetTags={resetTags} post={i}includeHeader="false" /> <br />
                </div>
                )
            ))
        })
    }




    return(
        <div>
        <Header />
        {userInfo && userInfo} <br />
        {postData && postData}
        </div>
    )
}

export default UsersPage