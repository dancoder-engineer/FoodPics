import React, {useState, useEffect} from "react";
import './info.css'

function Recipe({recipe}) {

    let [pic, setPic] = useState(null)
    let [seeRecipe, setSeeRecipe] = useState("↓")

    useEffect(() => {
        fetch("/recipepic/"+recipe.id)
        .then(res => res.json())
        .then(data => setPic(data.pic))
    }, [])


    function switchRecipe() {
        if (seeRecipe === "↓") { setSeeRecipe("↑") }
        if (seeRecipe === "↑") { setSeeRecipe("↓") }
    }

    console.log(recipe)

    return(
        <div>
            <h3 className="centered" onClick={switchRecipe}>Recipe: {recipe.title} {seeRecipe}</h3>
            <div className={seeRecipe}>
                {pic && <img src={pic} className="recipePic" /> } <br />
                <p className="centered">{recipe.ingredientlist}</p> <br />
                <p>{recipe.guide}</p>
            </div>
        </div>
    )
}

export default Recipe