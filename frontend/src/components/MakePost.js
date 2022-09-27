import React, {useState} from "react";
import './info.css'

import {assembleData, printFormdata} from './sharedfunctions/assembleData.js'
import MultiplePicUploader from './MultiplePicUploader.js'
import Post from './Post.js'
import CreateRecipe from './CreateRecipe.js'

function MakePost() {

    let [postData, setPostData] = useState(null)
    let [hasRecipe, setHasRecipe] = useState("off")
    let [recipeData, setRecipeData] = useState({})

    let [sendingData, setSendingData] = useState({
        pics: [],
        captions: [],
        user_id: 1
    })



    function handleChange(e) { 
       
        if(e.target.id.startsWith("caption")) { 
            let captions = sendingData.captions
       //     console.log(sendingData.pics)
       //     console.log(sendingData.captions)
            let place=parseInt(e.target.id.split('caption')[1])
            captions[place] = e.target.value
            setSendingData({
                ...sendingData,
                captions: captions
            })
        }
        if(e.target.type ==="file") { 
            let fileNo = parseInt(e.target.name.split("file")[1])
       //     console.log(sendingData.pics)
            let sdp = sendingData.pics
            sdp[fileNo] = {
                picData: e.target.value,
                pic: e.target.files[0]
            }
            setSendingData({
                ...sendingData,
                pics: sdp
            })
        }
        else {
            setSendingData({
                ...sendingData,
                [e.target.id]: e.target.value
            })
        }
    }

    function handleRid(elem) {
        if (sendingData.pics[elem]) {
            let sdp = sendingData.pics.splice(0, elem)
            setSendingData({
                ...sendingData,
                pics: sdp
        })
        }
    }

    function handleClick() {
        let formData = new FormData()
        formData = assembleData(sendingData, "post")

    //     printFormdata(formData)
    // if this is true, no file has been entered yet
    // console.log(e.target.files.length === 0)
        let picCaptions = ""
        for (let i in sendingData.captions) {
            picCaptions += sendingData.captions[i] + "||"
        }
        formData.append('post[captions]', picCaptions)
//        console.log(picCaptions.split("||"))

        for (let i in sendingData.pics) {
           formData.append(
                'post[pics][]',
                sendingData["pics"][i]["pic"],
                sendingData["pics"][i]["picData"]
            ) }

           
            printFormdata(formData)
            
            fetch('http://localhost:5000/posts', {
                method: 'post',
                body: formData,
            })
            .then(res => res.json())
            .then(data => {
        //        console.log(data)
                if (hasRecipe === "on") { sendRecipe(data.id) }
            })
    }

    function grabPost() {
        let postNo=document.querySelector("#title").value
        fetch('/posts/' + postNo)
        .then(res => res.json())
        .then(data => setPostData(data) )

    }

    function switchRecipe() {
        if (hasRecipe === "off") { setHasRecipe("on") }
        if (hasRecipe === "on") { setHasRecipe("off") }
       
    }

    function handleRecipe(e) {
     

        if(e.target.id === "avatar") {
            setRecipeData({
                ...recipeData,
                [e.target.id]: e.target.value,
                picFile: e.target.files[0]
            })   
        }
        else {
            setRecipeData({
                ...recipeData,
                [e.target.id]: e.target.value
            })
        }
    }

    function sendRecipe(postId) {
        let formData = new FormData()
        formData = assembleData(recipeData, "recipe")
        formData.append('recipe[post_id]', postId)
        formData.append('recipe[pic]', recipeData.picFile, recipeData.avatar)
        printFormdata(formData)
        if(Object.keys(recipeData).length === 5) {
            fetch("/recipes/", {
                method: 'post',
                body: formData,
            })
            .then(res => res.json())
            .then(data => console.log(data))

        }
        
    }


    return(
        <div>
            <h1 className="centered">Create a New Post</h1><br /><br />
            <form>
                Title: <input id="title" name="title" onChange={handleChange} /> <br />
                Where was it taken?: <input id="place" name="place" onChange={handleChange} /> <br />
                <textarea id="description" name="description" className="textA" onChange={handleChange} /><br />
                <MultiplePicUploader handleChange={handleChange} handleRid={handleRid}/><br />
                Include a Recipe: <input type="checkbox" onChange={switchRecipe} /><br />
                <div className={hasRecipe}>
                    <CreateRecipe handleRecipe={handleRecipe} />
                </div>
            </form><br /><br />

            <button onClick={handleClick}>Submit</button>
            <br /><br /><br /><br /><br /><br /><br /><br />
            <button onClick={grabPost}>Show me a test post</button>
            {postData && <Post post={postData} /> }
        </div>
    )
}

export default MakePost