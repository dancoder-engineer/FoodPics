import React from "react";

function CreateRecipe({handleRecipe}){

    return(
        <div>
            <h1>Recipe!!!!!!!!!!!!!!!!11111111111111111</h1>
            Name of the Recipe: <input id="title" onChange={handleRecipe} /> <br />
            List of Ingredients: <textarea id="ingredientlist" onChange={handleRecipe} /> <br />
            How to Make: <textarea id="guide" onChange={handleRecipe} /> <br />
            Picture: <input type="file"  id="avatar" name="avatar" onChange={handleRecipe} />
        </div>
    )
}

export default CreateRecipe