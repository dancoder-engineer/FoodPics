import React, {useState, useEffect} from "react";
import './info.css'

function Recipe({recipe, recipepic}) {

    let [seeRecipe, setSeeRecipe] = useState("↓")


    function switchRecipe() {
        if (seeRecipe === "↓") { setSeeRecipe("↑") }
        if (seeRecipe === "↑") { setSeeRecipe("↓") }
    }

  //  console.log(recipepic)

    return(
        <div>
            <h3 className="centered" onClick={switchRecipe}>{seeRecipe} Recipe: {recipe.title} {seeRecipe}</h3>
            <div className={seeRecipe}>
                <img src={recipepic} className="recipePic" /> <br />
                <p className="centered">{recipe.ingredientlist}</p> <br />
                <p>{recipe.guide}</p>
            </div>
        </div>
    )
}

export default Recipe