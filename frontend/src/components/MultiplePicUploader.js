import React from "react";

function MultiplePicUploader({handleChange}) {



    return (
    <div>
                File 1: <input type="file" id="file0" name="file0" onChange={handleChange} /> <br />
                File 2: <input type="file" id="file1" name="file1" onChange={handleChange} /> 
    </div>
)}
    
export default MultiplePicUploader