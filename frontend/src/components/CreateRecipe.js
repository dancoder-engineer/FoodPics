import React from "react";
import store from "./Redux/store.js";
import { useDispatch, useSelector } from "react-redux";
import { setRecipeParam } from './Redux/postSlice.js'


function CreateRecipe({handleRecipe}){

    const dispatch = useDispatch();

    function setRedux(e) {

        let payload = {}

        if (e.target.files) {
            payload = {
                id: e.target.id,
                value: e.target.value,
                file: e.target.files[0]}
        }
        else {
            payload = {
                id: e.target.id,
                value: e.target.value,
                file: "n/a"}
        }

        dispatch(setRecipeParam(payload))
    }



    return(
        <div>
            <h1>Recipe!!!!!!!!!!!!!!!!11111111111111111</h1>
            Name of the Recipe: <input id="name" onChange={setRedux} /> <br />
            List of Ingredients: <textarea id="ingredientlist" onChange={setRedux} className="textA" /> <br />
            How to Make: <textarea id="guide" onChange={setRedux} className="textA" /> <br />
            Picture: <input type="file"  id="pic" name="pic" onChange={setRedux} />
        </div>
    )
}

export default CreateRecipe