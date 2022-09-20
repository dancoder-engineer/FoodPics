import React, {useState, useEffect} from "react";
import './info.css'

function Post({post}) {

    let [userInfo, setUserInfo] = useState(null)
    let [pics, setPics] = useState(null)

  //  console.log(post)

    useEffect(() => { 
     //   fetch('/posts/' )
        let userId = post.post.user_id
        fetch('/useravatar/' + userId)
        .then(res => res.json())
        .then(data => createData(data))
    }, [])

    function createData(data) {
        setUserInfo(data)
        setPics(() => post.pics.map((i) => <img className="postPic" src={i} />))
    }
return(
    <div className="post">
        {userInfo && ( 
            <div>
                <h1 className="floatCenter">{post.post.title}</h1>
                <img className="miniPic" src={userInfo.avatar} />
                <p className="floatCenter">
                    {userInfo.UserName} <br/>
                    Location: {post.post.place}</p><br/>
                    {post.post.description}<br/>
                    {pics && pics}
            </div> )}

    </div>
)

}

export default Post