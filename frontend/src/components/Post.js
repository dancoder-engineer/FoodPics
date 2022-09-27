import React, {useState, useEffect} from "react";
import Recipe from './Recipe.js'
import './info.css'

function Post({post}) { 

    let [userInfo, setUserInfo] = useState(null)
    let [captions, setCaptions] = useState(null)
    let [picNo, setPicNo] = useState(0)


  //  console.log(post)

    useEffect(() => { 
     //   fetch('/posts/' )
        setCaptions(post.post.captions.split('||'))
        let userId = post.post.user_id
        fetch('/useravatar/' + userId)
        .then(res => res.json())
        .then(data =>setUserInfo(data))
    }, [])



    function changePic(e) {
     //   console.log(post)
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
                <h3 className="floatCenter">{post.post.title}</h3>
                <div className="userInfo">
                    <div className="col1"><img className="miniPicOnPost" src={userInfo.avatar} /></div>
                    <div className="col2">
                           {userInfo.UserName}<br />
                           Location: {post.post.place}
                    </div>
                </div><br />
                
                    
                    {post.post.description}<br/>
                    <img src={post.pics[picNo]} className="postPic" onClick={changePic}/>
                    <p className="nums">{picNo+1}/{post.pics.length}</p>
                    <p className="centered">{captions[picNo]}</p>
                    <br /><br /><br />
                    {post.recipe && <Recipe recipe={post.recipe} /> }
            </div> )}

    </div>
)

}

export default Post