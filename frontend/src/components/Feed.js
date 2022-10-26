import React, { useEffect, useState } from "react";
import Post from './Post.js'
import { useSelector } from "react-redux";
import {useNavigate} from 'react-router-dom'

import Header from './Header.js'

function Feed() {

    const [postData, setPostData] = useState(null)
    const history = useNavigate() 

    useEffect(() => {
        
        fetch("/getme/")
        .then(res => res.json())
        .then(data => { 
            if (data.user) { makeFeed() } 
            else { history('/login/')}    
        } )
        
        }, [])


    function makeFeed() {
        fetch('/makefeed/')
        .then(res => res.json())
        .then(data => { 
            if(data.error) {
                history('./login')
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

export default Feed