import React, {useState} from "react";
import './info.css'

import {assembleData, printFormdata} from './sharedfunctions/assembleData.js'

function MakePost() {

    let [sendingData, setSendingData] = useState({
        pics: [],
        user_id: 1
    })

    function handleChange(e) {
        if(e.target.type ==="file") {
            let fileNo = parseInt(e.target.name.split("e")[1])
            setSendingData({
                ...sendingData,
                pics: {...sendingData.pics,
                [fileNo]: {
                    picData: e.target.value,
                    pic: e.target.files[0]
                }}
            })
        }
        else {
            setSendingData({
                ...sendingData,
                [e.target.id]: e.target.value
            })
        }
    }

    function handleClick() {
        let formData = new FormData()
        formData = assembleData(sendingData, "post")

     //     printFormdata(formData)

        for (let i in sendingData.pics) {
           formData.append(
                'post[pics][]',
                sendingData["pics"][i]["pic"],
                sendingData["pics"][i]["picData"]
            ) }

           

            
            fetch('http://localhost:5000/posts', {
                method: 'post',
                body: formData,
            })
            .then(res => res.json())
            .then(data => console.log(data))

        

        

     

    }

    return(
        <div>
            <h1 className="centered">Create a New Post</h1><br /><br />
            <form>
                Title: <input id="title" name="title" onChange={handleChange} /> <br />
                Where was it taken?: <input id="place" name="place" onChange={handleChange} /> <br />
                <textarea id="description" name="description" className="textA" onChange={handleChange} /><br />
                File 1: <input type="file" id="file0" name="file0" onChange={handleChange} /> <br />
                File 2:<input type="file" id="file1" name="file1" onChange={handleChange} /> 
            </form><br /><br />

            <button onClick={handleClick}>Submit</button>
        </div>
    )
}

export default MakePost