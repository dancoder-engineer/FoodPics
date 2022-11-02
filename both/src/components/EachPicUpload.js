import React from "react";

function EachPicUpload ({handleChange, number, ridThis}) {

    const num = parseInt(number)
    const idName = "file" + number
    const captName = "caption" + number

  

    return(
        <div><br />
                File {num + 1}: <input type="file" id={idName} name={idName} onChange={handleChange} /><br />
                <textarea onChange={handleChange} id={captName} className="textA"/><br />
        </div>
    )
}

export default EachPicUpload