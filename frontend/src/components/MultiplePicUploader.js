import React, {useState} from "react";
import EachPicUpload from './EachPicUpload.js'

function MultiplePicUploader({handleChange, handleRid}) {

let [picUploads, setPicUploads] = useState([
    (<div key="0">
        <EachPicUpload handleChange={change} number="0" ridThis={ridThis} />    </div>)
])


//<button onClick={addAPic}>+</button> <button onClick={ridLast}>-</button>

function change(e) { handleChange(e) }

function ridLast(e) {
    e.preventDefault()
    let picu = picUploads
    let len = picUploads.length
    picu.pop()
    setPicUploads([...picu])
    handleRid(len-1)
}

function ridThis(e) {
 e.preventDefault()
 console.log(picUploads)
}


function addAPic(e) {
          e.preventDefault()
//        console.log(e.target.files[0] === undefined)
//        console.log(e.target.value === "")
//        e.target.value = ""
        let num = picUploads.length
        let picu = picUploads
        picu.push(
            (<div key={num}><EachPicUpload handleChange={change} number={picUploads.length} ridThis={ridThis}/>    </div>)
        )
        console.log(picu)
        setPicUploads([...picu])
 
    }

    return (
    <div>
                {picUploads}
                <button onClick={addAPic}>+</button> <button onClick={ridLast}>-</button>
     </div>
)}
    
export default MultiplePicUploader