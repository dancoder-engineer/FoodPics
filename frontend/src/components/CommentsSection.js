import React, { useEffect, useState } from "react";

import Comment from "./Comment";

function CommentsSection({postId, resetUser}) {

    const[comments, setComments] = useState(null)
    const[loggedIn, setLoggedIn] = useState(null)
    const[commentContent, setCommentContent] = useState("")

    useEffect(() => {
        getComments()
        checkLoggedIn()
    },[])



    function getComments() {
        fetch("/commentsbypost/"+postId)
        .then(res => res.json())
        .then(data => {
            if(!data.error) {
                setComments(data.map((i) => <Comment resetUser={resetUser} commentData={i} key={i.id}/>)
                    )
            }
        })
    }

    function checkLoggedIn() {
        fetch("/getme/")
        .then(res => res.json())
        .then(data => {
            if (data.user) { 
                setLoggedIn(data)
            }
        })
    }

    function handleSubmit(e) {
        e.preventDefault()
        let spaceLess = commentContent.replace(/\s+/g, '')
        if(!spaceLess) { return 0 }
        console.log(loggedIn.user.id)
        const sendingData = {
            post_id: postId,
            user_id: loggedIn.user.id,
            content: commentContent
        }

        fetch("/comments/", {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              'accept': 'application/json' 
            },
            body: JSON.stringify(sendingData)
          })
          .then(res => res.json())
          .then(data => {
           // document.getElementById("newComment").value = ""
            let boxes = document.querySelectorAll(".allAcross")
            boxes.forEach(element => {
                element.value=""
            });
            setCommentContent("")
            getComments()
            checkLoggedIn()
        })
    }

    function handleChange(e) {
        setCommentContent(e.target.value)
    }

    return(<div>
        {comments}
        {loggedIn && (
            <div>
                <textarea id="newComment" className="allAcross" onChange={handleChange} />
                <button id="submitNewComment" className="allAcross" onClick={handleSubmit}>Post!</button>
            </div>
        )}

    </div>)
}

export default CommentsSection