import React from "react";

function MultiplePicUploader({handleChange}) {


    return (
    <div>
                File 1: <input type="file" id="file0" name="file0" onChange={handleChange} /> <input onChange={handleChange} id="caption0" /><br />
                File 2: <input type="file" id="file1" name="file1" onChange={handleChange} /> <input onChange={handleChange} id="caption1" />
    </div>
)}
    
export default MultiplePicUploader