import React, {useState, useEffect} from "react";
import { convertTimeDate } from './sharedfunctions/assembleData.js'
import Recipe from './Recipe.js'
import './info.css'
import { NavLink, useNavigate } from "react-router-dom";
import CommentsSection from "./CommentsSection.js";

function Post({post, resetTags, includeHeader, resetUser}) { 

    let [userInfo, setUserInfo] = useState(null)
    let [captions, setCaptions] = useState(null)
    let [timeDate, setTimeDate] = useState(null)
    let [tags, setTags] = useState(null)
    let [picNo, setPicNo] = useState(0)

   
    const history=useNavigate()

    useEffect(() => { 
        setTimeDate(convertTimeDate(post.post.updated_at))
        setCaptions(post.post.captions.split('||'))
        makeTags()
        let userId = post.post.user_id
        fetch('/useravatar/' + userId)
        .then(res => res.json())
        .then(data =>setUserInfo(data))
    }, [])

    function makeTags() { // console.log(post)
  

          setTags( post.tags.map((i, index) => {
             return <span className="tag" key={i} onClick={sendToTag} >{i}</span>
     }))
        
    }


    function sendToTag(e) {
        if (resetTags) { resetTags(e.target.innerText) }
        else {history("/postsbytag/" + e.target.innerText)}
    }

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

    function toUser() {
        history('/user/'+userInfo.UserName)
    }

return(
    <div className="post">
        {userInfo && ( 
            <div>
                <h3 className="floatCenter">{post.post.title}</h3>
                {timeDate && <p className="smallCentered">{timeDate}</p>}
                {includeHeader==="true" && 
                (<div className="userInfo">
                    
                    <div className="col1"><NavLink to={'/user/'+userInfo.UserName}><img className="miniPicOnPost" src={userInfo.avatar} /></NavLink></div>
                    <div className="col2" onClick={toUser}>                           
                                {userInfo.UserName}<br />
                                Location: {post.post.place}
                    </div><br />
                    
                </div>) }
                
                
                
                    
                    {post.post.description}<br/><br/>
                    <img src={post.pics[picNo]} className="postPic" onClick={changePic}/>
                    <p className="nums">{picNo+1}/{post.pics.length}</p>
                    <p className="centered">{captions[picNo]}</p>
                    {post.recipe && <br /> }
                    {post.recipe && <Recipe recipe={post.recipe} recipepic={post.recipepic} /> }
                    <br />
                    <div className="tagDiv">{tags && tags}<br /><br /></div>
                    <CommentsSection resetUser={resetUser} postId={post.post.id} />
            </div> )}

    </div>
)

}

export default Post