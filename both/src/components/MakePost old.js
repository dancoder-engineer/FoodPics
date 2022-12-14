import React, {useState} from "react";
import './info.css'

import {assembleData, printFormdata} from './sharedfunctions/assembleData.js'
import MultiplePicUploader from './MultiplePicUploader.js'
import Post from './Post.js'
import CreateRecipe from './CreateRecipe.js'

function MakePost() {

    let [postData, setPostData] = useState(null)
    let [hasRecipe, setHasRecipe] = useState("↓")
    let [recipeData, setRecipeData] = useState({})

    let [sendingData, setSendingData] = useState({
        pics: [],
        captions: [],
        user_id: 5
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
        if(e.target.id.startsWith("file")) { 
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

    function handleClick() { console.log(sendingData)
        
        let formData = new FormData()
        //formData = assembleData(sendingData, "post")
        formData.append('post[title]', document.querySelector("#title").value)
        formData.append('post[place]', document.querySelector("#place").value)
        formData.append('post[description]', document.querySelector("#description").value)
        formData.append('post[user_id]', sendingData.user_id)
   //     printFormdata(formData)
    // if this is true, no file has been entered yet
    // console.log(e.target.files.length === 0)
        let picCaptions = sendingData.captions.join("||")

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
                console.log(data)
                if (hasRecipe === "↑") { sendRecipe(data.id) }
            })
    }

    function grabPost() {
        let postNo=document.querySelector("#title").value
        fetch('/posts/' + postNo)
        .then(res => res.json())
        .then(data => {console.log(data)
            setPostData(data)
         })

    }

    function switchRecipe() {
        if (hasRecipe === "↓") { setHasRecipe("↑") }
        if (hasRecipe === "↑") { setHasRecipe("↓") }
       
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
        console.log(recipeData)
      //  if(Object.keys(recipeData).length === 5) {
            fetch("/recipes/", {
                method: 'post',
                body: formData,
            })
            .then(res => res.json())
            .then(data => console.log(data))

   //     }
        
    }


    return(
        <div>
            <h1 className="centered">Create a New Post</h1><br /><br />
            <form>
                Title: <input id="title" name="title" /> <br />
                Where was it taken?: <input id="place" name="place" /> <br />
                <textarea id="description" name="description" className="textA"  /><br />
                <MultiplePicUploader handleChange={handleChange} handleRid={handleRid}/><br />
                Include a Recipe: <input type="checkbox" onChange={switchRecipe} /><br />
                <div className={hasRecipe}>
                    <CreateRecipe handleRecipe={handleRecipe} />
                </div>
            </form><br /><br />

            <button onClick={handleClick}>Submit</button>
        </div>
    )
}

export default MakePost