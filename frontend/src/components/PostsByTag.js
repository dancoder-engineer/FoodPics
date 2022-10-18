import React, { useEffect, useState } from "react";
import Post from './Post.js'
import { useSelector } from "react-redux";
import {useNavigate, useParams} from 'react-router-dom'

import Header from './Header.js'

function PostsByTag() {

    const [postData, setPostData] = useState(null)
    const history = useNavigate() 

    const params = useParams()

    useEffect(() => makeFeed(), [])

    useEffect(() => {
        setPostData(null)
        makeFeed(params.id)
    }, [params.id])


    function makeFeed(tag=params.tag) { console.log(tag)
        fetch('/postsbytag/' + tag)
        .then(res => res.json())
        .then(data => { 
            if(1 === 2) {
               // history('./login')
            }
            else 
            {
            setPostData(data.map((i, index) => 
                (
                <div key={index}>
                    <Post resetUser={resetUser} post={i} key={index} includeHeader="true" /> <br />
                </div>
                )
            ))}
        })

    }

    function resetUser(tag) {
        console.log(tag)
        setPostData(null)
        makeFeed(tag)
        history('/postsbytag/'+tag)
    }

    return(
        <div>
            <Header />
            {postData && postData}
        </div>
    )
}

export default PostsByTag