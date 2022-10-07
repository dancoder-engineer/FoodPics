import React, {useState, useEffect} from "react";
import './info.css'

function Recipe({recipe, recipepic}) {

    let [seeRecipe, setSeeRecipe] = useState("↓")
    let [liSet, setLiSet] = useState(null)

    useEffect(() => {
        let elements = recipe.ingredientlist.split('\r\n')
        console.log(elements)
        setLiSet(elements.map((i, index) => (<li key={index}>{i}</li>))   )
    },[])

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
                <ul className="centeredLi">{liSet && liSet}</ul> <br />
                <p>{recipe.guide}</p>
            </div>
        </div>
    )
}

export default Recipe