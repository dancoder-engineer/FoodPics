import React, { useEffect, useState } from "react";
import Post from './Post.js'

function Feed() {

    const [postData, setPostData] = useState(null)

    useEffect(() => makeFeed(), [])

    function makeFeed() {
        fetch('/makefeed/')
        .then(res => res.json())
        .then(data => { 
            setPostData(data.map((i, index) => 
                (
                <div>
                    <Post post={i} key={index} includeHeader="true" /> <br />
                </div>
                )
            ))
        })

    }

    return(
        <div>
            {postData && postData}
        </div>
    )
}

export default Feed