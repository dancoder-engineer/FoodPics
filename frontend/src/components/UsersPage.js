import React, { useEffect, useState } from "react";
import {useParams} from 'react-router-dom'
import InfoCard from "./InfoCard.js";

import Post from './Post.js'

function UsersPage() {
    const params = useParams()
    
    const [userInfo, setUserInfo] = useState(null)
    const [postData, setPostData] = useState([])
   
   


    useEffect(() => {
        fetch('/userid/' + params.name)
        .then(res => res.json())
        .then(data => {
            setUserInfo(<InfoCard data={data} />)
            getPostNums(data.user.id)
        })
    }, [])



    function getPostNums(id) {
        fetch('/userposts/' + id)
        .then(res => res.json())
        .then(data => { 
            setPostData(data.posts.map((i) => 
                (
                <div>
                    <Post post={i} key={i.post.id} includeHeader="false" /> <br />
                </div>
                )
            ))
        })
    }




    return(
        <div>
        {userInfo && userInfo} <br />
        {postData && postData}
        </div>
    )
}

export default UsersPage