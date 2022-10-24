import React, { useEffect, useState } from "react";
import Post from './Post.js'
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
        fetch('/postsbytagback/' + tag)     
        .then(res => res.json())
        .then(data => {
            if(data.error) {
               setPostData(<h1 className="centered">No posts with tag {tag} found!</h1>)
            }
            else 
            {
            setPostData(data.map((i, index) => { return (
            <div>
                <Post resetTags={resetTags} resetUser={resetUser} post={i} key={index} includeHeader="true" /><br /> 
            </div>)
                        }))}
        })

    }

    function resetTags(tag) {
        setPostData(null)
        makeFeed(tag)
        history('/postsbytag/'+tag)
    }

    function resetUser(user) {
        history('/user/'+user)
    }


    return(
        <div>
            <Header />
            {postData && postData}
        </div>
    )
}

export default PostsByTag