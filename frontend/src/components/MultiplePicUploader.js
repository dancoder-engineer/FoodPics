import React, {useState} from "react";
import EachPicUpload from './EachPicUpload.js'

function MultiplePicUploader({handleChange, handleRid}) {

let [picUploads, setPicUploads] = useState([
    (<div key="0">
        <EachPicUpload handleChange={change} addAPic={addAPic} ridLast={ridLast} number="0"/>    </div>)
])

function change(e) { handleChange(e) }

function ridLast(e) {
    e.preventDefault()
    let picu = picUploads
    let len = picUploads.length
    picu.pop()
    setPicUploads([...picu])
    handleRid(len-1)
}


function addAPic(e) {
          e.preventDefault()
//        console.log(e.target.files[0] === undefined)
//        console.log(e.target.value === "")
//        e.target.value = ""
        let num = picUploads.length
        let picu = picUploads
        picu.push(
            (<div key={num}><EachPicUpload handleChange={change} addAPic={addAPic} ridLast={ridLast} number={picUploads.length}/>    </div>)
        )
        console.log(picu)
        setPicUploads([...picu])
 
    }

    return (
    <div>
                {picUploads}
     </div>
)}
    
export default MultiplePicUploader