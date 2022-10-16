import React, {useState} from "react";
import './info.css'

import {assembleData, printFormdata} from './sharedfunctions/assembleData.js'
import MultiplePicUploader from './MultiplePicUploader.js'
import CreateRecipe from './CreateRecipe.js'

import store from "./Redux/store.js";
import { useDispatch, useSelector } from "react-redux";
import { setParam, setCaptions } from './Redux/postSlice.js'

function MakePost() {

    let [errorMessage, setErrorMessage] = useState(null)
    let [hasRecipe, setHasRecipe] = useState("↓")
    let [recipeData, setRecipeData] = useState({})

    let [sendingData, setSendingData] = useState({
        pics: [],
        captions: [],
        user_id: 5
    })

    const dispatch = useDispatch();
    const makingPost = useSelector((state) => state.post);

    store.subscribe(() => console.log(makingPost))



    function handleChange(e) { 

        let payload = {}
     
       
        if(e.target.id.startsWith("caption")) { 
            payload = {
                id: e.target.id,
                value: e.target.value,
                }
            
            dispatch(setCaptions(payload))
            
        }
        else if(e.target.id.startsWith("file")) { 
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
            payload = {
                param: e.target.id,
                value: e.target.value,
                file: "n/a"}

            dispatch(setParam(payload))
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
            
            fetch('/posts/', {
                method: 'post',
                body: formData,
            })
            .then(res => res.json())
            .then(data => {

                if (data.errors) {
                    setErrorMessage(data.errors.map((i) => <p>{i}</p>))
                }
                else {
                console.log(data)
                if (hasRecipe === "↑") { sendRecipe(data.id) }
                }
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


    function seeRedux() {
        console.log(makingPost)
        checkPics()
    }


    function checkPics() {
        for (let i in makingPost.captions) {
            let id = "file" + i
            let fileInput = document.querySelector("#"+id)
            if (!fileInput.files[0]) {
                setErrorMessage(<p>A file must be uploaded for all pictures. If you don't need as many as you once thought, you can click the - button to take one away.</p>)
                return false
            }
        }

        if (hasRecipe === "↑" && !makingPost.recipe.pic) { 
            setErrorMessage(<p>If you're uploading a recipe, it must have a picture.</p>)
            return false
         }        

         setErrorMessage(null)
         return true
    }

    return(
        <div>
            <h1 className="centered">Create a New Post</h1><br /><br />
            <form>
                Title: <input id="title" name="title" onChange={handleChange} /> <br />
                Where was it taken?: <input id="place" name="place" onChange={handleChange} onClick={seeRedux} /> <br />
                <textarea id="description" name="description" className="textA"  onChange={handleChange} /><br />
                <MultiplePicUploader handleChange={handleChange} handleRid={handleRid}/><br />
                Include a Recipe: <input type="checkbox" onChange={switchRecipe} /><br />
                <div className={hasRecipe}>
                    <CreateRecipe handleRecipe={handleRecipe} />
                </div>
            </form><br /><br />

            <button onClick={handleClick}>Submit</button><br /><br />
            {errorMessage}
        </div>
    )
}

export default MakePost