import React from "react";

function EachPicUpload ({handleChange, addAPic, number, ridLast}) {

    const num = parseInt(number)
    const idName = "file" + number
    const captName = "caption" + number
  

    return(
        <div>
                File {num + 1}: <input type="file" id={idName} name={idName} onChange={handleChange} /> <input onChange={handleChange} id={captName} /> <button onClick={addAPic}>+</button> <button onClick={ridLast}>-</button> <br />
        </div>
    )
}

export default EachPicUpload