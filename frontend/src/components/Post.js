import React, {useState, useEffect} from "react";
import './info.css'

function Post({post}) {

    let [userInfo, setUserInfo] = useState(null)
    let [pics, setPics] = useState(null)
    let [picNo, setPicNo] = useState(0)

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
        setPics(() => post.pics.map((i, index) => <img className="postPic" key={index} src={i} />))
    }

    function changePic(e) {
     //   console.log(picNo, post.pics.length-1)
        let xPos = e.pageX - e.target.offsetLeft
        let halfwayPoint = e.target.clientWidth / 2

        if (xPos < halfwayPoint) {
            if (picNo===0) {return 0}
            setPicNo(picNo => picNo - 1)
        }
        else {
            if (picNo===post.pics.length-1) {return 0}
            setPicNo(picNo => picNo + 1)
        }

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
                    <img src={post.pics[picNo]} className="postPic" onClick={changePic}/>
                    <p className="nums">{picNo+1}/{post.pics.length}</p>
            </div> )}

    </div>
)

}

export default Post