
import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import './info.css'
import {assembleData} from './sharedfunctions/assembleData.js'

function MakeUser() {

    const history = useNavigate()

    const [sendingData, setSendingData] = useState({})
    const [errors, setErrors] = useState([])

    function handleChange(e){

        if (e.target.id==="avatar") {
            setSendingData({ 
                ...sendingData,
                [e.target.id]: e.target.value,
                avpic: e.target.files[0]
            })

        }
        else {
            setSendingData({
                ...sendingData,
                [e.target.id]: e.target.value
        })
    }
    }


    function handleSubmit(e) {

        let formData = new FormData()
        formData = assembleData(sendingData, "user")

        if (sendingData.avpic, sendingData.avatar) {
            formData.append('user[avatar]', sendingData.avpic, sendingData.avatar)
        }
        else
        {
            setErrors("Must have an avatar.")
            return 0
        }
        
            fetch('/users/', {
            method: 'post',
            body: formData,
            })
            .then (res => res.json())
            .then (data => {
                console.log(data)
                if (data.errors) { 
                    setErrors(data.errors.map((i, index) => 
                        <p className="error" key={index}>{i}</p>
                    ))
                 }
                 else {
                    setErrors([])
                    history('/login/')
                 }
               
            })
    }




         function goLog() {
            history('/login/')
        }
    

    return(
        
        <div className="registerPage">
            <img className="backImg" alt=""     src="https://imgur.com/YmGrKF5.png" />
            <div className="registerInfo">
                <h1>Make User</h1>
                <form id="form">
                User Name: <input name="UserName" id="UserName" onChange={handleChange} /><br />
                Password: <input type="password" name="password" id="password" onChange={handleChange} /><br />
                Password: <input type="password" name="password_confirmation" id="password_confirmation" onChange={handleChange}  /><br />
                <br /><br />
                Full Real Name: <input name="ActualName" id="ActualName" onChange={handleChange} /><br />
                Pronouns: <input name="Pronouns" id="Pronouns" onChange={handleChange} /><br />
                Website: <input name="Website" id="Website" onChange={handleChange} /><br /><br />
                Description: <textarea className="description" name="Description" id="Description" onChange={handleChange} /><br /><br />
                
                Avatar: <input type="file" id="avatar" name="avatar" onChange={handleChange} /> <br />
                <br />
                </form>
                <button onClick={handleSubmit}>Submit</button><br />
                {errors && errors}
                <br />
            </div>

            <div className="goLogin" onClick={goLog}>
                <br />Login
            </div>

        </div>
    )
}

export default MakeUser

/* <div className="devStuff">
<button onClick={youGetMe}>Get Me</button>
<button id="Ben" onClick={defaultData}>Chef Ben</button> 
<button id="Tony" onClick={defaultData}>Chef Tony</button> 
<input name="whatever" onClick={getAv} />
</div> */
