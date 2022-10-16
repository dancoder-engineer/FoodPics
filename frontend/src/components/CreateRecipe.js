import React from "react";
import store from "./Redux/store.js";
import { useDispatch, useSelector } from "react-redux";
import { setRecipeParam } from './Redux/postSlice.js'


function CreateRecipe({handleRecipe}){

    const dispatch = useDispatch();

    function setRedux(e) {

        let payload = {}

    
            payload = {
                id: e.target.id,
                value: e.target.value,
                }
        

        dispatch(setRecipeParam(payload))
    }

    function setRecipe(e) {

        handleRecipe(e)
        
    }



    return(
        <div><br />
            Name of the Recipe: <input id="title" onChange={setRedux} /> <br />
            List of Ingredients: <textarea id="ingredientlist" onChange={setRedux} className="textA" /> <br />
            How to Make: <textarea id="guide" onChange={setRedux} className="textA" /> <br />
            Picture: <input type="file"  id="pic" name="pic" onChange={setRecipe} />
        </div>
    )
}

export default CreateRecipe