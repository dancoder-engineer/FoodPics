import React, {useState, useEffect} from "react";
import './info.css'

import MultiplePicUploader from './MultiplePicUploader.js'
import CreateRecipe from './CreateRecipe.js'
import Header from './Header.js'

import store from "./Redux/store.js";
import { useDispatch, useSelector } from "react-redux";
import { setParam, setCaptions, popPic } from './Redux/postSlice.js'
import { useNavigate } from "react-router-dom";

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
    const history = useNavigate()

    const makingPost = useSelector((state) => state.post);

    //store.subscribe(() => console.log(makingPost))




    useEffect(() => {
        fetch("/getme/")
        .then(res => res.json())
        .then(data => { 
            if (!data.user) { 
                history('/login/')
            }
            else {
                setSendingData({
                    ...sendingData,
                    user_id: data.user.id
                })
            }
        })
    }, [])

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

        if (makingPost.captions[elem]) {
            dispatch(popPic())
        }
    }


    function makeFormData(type, postId=0) {

        let formData = new FormData()

        if (type === "Post") {
            formData.append('post[title]', makingPost.post.title )
            formData.append('post[place]', makingPost.post.place )
            formData.append('post[description]', makingPost.post.description)
            formData.append('post[user_id]', sendingData.user_id)
            let picCaptions = makingPost.captions.join("||")

            formData.append('post[captions]', picCaptions)

            for (let i in sendingData.pics) {
                formData.append(
                    'post[pics][]',
                    sendingData["pics"][i]["pic"],
                    sendingData["pics"][i]["picData"]
                ) }

        
    }

    if (type==="Recipe") {
        formData.append('recipe[title]', makingPost.recipe.title )
        formData.append('recipe[ingredientlist]', makingPost.recipe.ingredientlist )
        formData.append('recipe[guide]', makingPost.recipe.guide )
        formData.append('recipe[post_id]', postId)
        formData.append('recipe[pic]', recipeData.picFile, recipeData.pic)
    }

    return formData

    }

    function handleClick() {

        checkPics()
        let formData = makeFormData("Post")
            
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
                if (hasRecipe === "↑") { sendRecipe(data.id) }
                else { history('/') }
                }

            })
    }

    function switchRecipe() {
        if (hasRecipe === "↓") { setHasRecipe("↑") }
        if (hasRecipe === "↑") { setHasRecipe("↓") }
       
    }

    function handleRecipe(e) {
     

        if(e.target.id === "pic") {
            setRecipeData({
                ...recipeData,
                [e.target.id]: e.target.value,
                picFile: e.target.files[0]
            })   
        }

    }

    function sendRecipe(postId) { 
        let formData = makeFormData("Recipe", postId)

            fetch("/recipes/", {
                method: 'post',
                body: formData,
            })
            .then(res => res.json())
            .then(() => history('/'))
        
    }


    function seeRedux() {
        console.log(Object.keys(makingPost.recipe).length === 3)
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

        if (hasRecipe === "↑" && !recipeData.picFile) { 
            setErrorMessage(<p>If you're uploading a recipe, it must have a picture.</p>)
            return false
         }        

         if (hasRecipe === "↑" &&  (!makingPost.recipe.title || !makingPost.recipe.ingredientlist || !makingPost.recipe.guide )) { 
            setErrorMessage(<p>If you wish to have a recipe, please fill out all of the recipe's fields.</p>)
            return false
         }

         setErrorMessage(null)
         return true
    }

    return(
        <div className="makePostPage">

            <img className="backImg" src="https://imgur.com/OLunZTA.png" />
            <div className="makePostHeader">
                <Header />
            </div>

            <div className="makePost">
                <h3 className="centered">Create a New Post</h3>
                <form>
                    Title: <input id="title" name="title" onChange={handleChange} /> <br />
                    Where was it taken?: <input id="place" name="place" onChange={handleChange} /> <br />
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
        </div>
    )
}

export default MakePost


