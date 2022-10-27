import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from './Header.js'
import Post from './Post.js'

function OnePost() {

    const [post, setPost] = useState(null)
    const params = useParams()
    const history=useNavigate()

    useEffect(() => {
        makePost()
    },[])

    useEffect(() => {
        setPost(null)
        makePost()
    }, [params.id])

    
function makePost() {
    fetch("/posts/" + params.id)
    .then(res => res.json())
    .then(data => setPost(data))
}


function resetUser(user) {
    history('/user/'+user)
}

    return(
        <div>
            <Header />
            {post &&
            <Post resetUser={resetUser} post={post} includeHeader="true" /> }
            <br />
        </div>
    )
}

export default OnePost


