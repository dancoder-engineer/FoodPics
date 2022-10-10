import React, { useEffect, useState } from "react";
import Post from './Post.js'
import { useSelector } from "react-redux";
import {useNavigate} from 'react-router-dom'

import Header from './Header.js'

function Feed() {

    const user = useSelector((state) => state);
    const [postData, setPostData] = useState(null)
    const history = useNavigate() 

    useEffect(() => makeFeed(), [])


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
                    <Post post={i} key={index} includeHeader="true" /> <br />
                </div>
                )
            ))}
        })

    }

    return(
        <div>
            <Header loginPage={"false"}/>
            {postData && postData}
        </div>
    )
}

export default Feed