import React, { useEffect, useState } from "react";

import Comment from "./Comment";

function CommentsSection({postId}) {

    const[comments, setComments] = useState(null)

    useEffect(() => {
        fetch("/commentsbypost/"+postId)
        .then(res => res.json())
        .then(data => {
            if(!data.error) {
                setComments(data.map((i) => <Comment commentData={i} key={i.id}/>)
                    )
            }
        })
    },[])

    return(<div>
        {comments}
    </div>)
}

export default CommentsSection