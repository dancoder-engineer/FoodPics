import React from "react";

function EachPicUpload ({handleChange, number, ridThis}) {

    const num = parseInt(number)
    const idName = "file" + number
    const captName = "caption" + number
    const buttonName = "pic" + number

    let testButton = (<button onClick={ridThis}>-</button>)
  

    return(
        <div>
                File {num + 1}: <input type="file" id={idName} name={idName} onChange={handleChange} /> <input onChange={handleChange} id={captName} /> {testButton} <br />
        </div>
    )
}

export default EachPicUpload