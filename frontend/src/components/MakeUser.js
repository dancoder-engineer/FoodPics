
import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import './info.css'
import InfoCard from './InfoCard.js'
import {assembleData} from './sharedfunctions/assembleData.js'

function MakeUser() {

    const history = useNavigate()


  
    const [userData, setUserData] = useState(null)
    const [sendingData, setSendingData] = useState({})
    const [errors, setErrors] = useState([])

    function defaultData(e) {
        if (e.target.id==="Ben") {
            setSendingData ({
                UserName: "ChefBenShapiro",
                password: "mywifeisadoctor",
                password_confirmation: "mywifeisadoctor",
                ActualName: "It's not Ben Shapiro... At least I THINK it's not...",
                Description: "I, who am married to a doctor, am most famous for bombarding the internet will a million videos of myself. If you finsh watching one, any algorithm will show you everything I upload and you will literally never see anything else! Did I mention my wife's a doctor? Because she is.",
                Pronouns: "I'm right wing. I don't do this!",
                Website: "http://www.toiletpaperusa.com/",
                avatar: ""
        })
        }
        if (e.target.id==="Tony") {
            setSendingData ({
                UserName: "Chef Tony Stark as Portrayed by Antonio Banderas",
                password: "salt",
                password_confirmation: "salt",
                ActualName: "Salt Bae",
                Description: "I'm famous for putting salt on solid gold that you will put in your body because it's wrapped around meat, but since gold is a metal, your body won't digest it, and it'll go straight into your shitter whole, so you can literally flush solid gold down the toilet to prove how rich you are.",
                Pronouns: "He/Him",
                Website: "http://www.saltbae.com/",
                avatar: ""
        })
        
        
        

        }
    }

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
        
            fetch('http://localhost:5000/users', {
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
                 }
               
            })
    }

    function getAv(e) { 

        if (!e.target.value) {return 0}
        let url = "/posts/"+ e.target.value
         fetch(url, {method: 'DELETE'})
 }

         function youGetMe() {
            fetch('/getme/')
            .then(res => res.json())
            .then(data => console.log(data))
         }


         function goLog() {
            history('/login/')
        }
    

    return(
        
        <div className="registerPage">
{sendingData.avpic && <img src={sendingData.avpic} />}
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

            <div className="devStuff">
                <button onClick={youGetMe}>Get Me</button>
                <button id="Ben" onClick={defaultData}>Chef Ben</button> 
                <button id="Tony" onClick={defaultData}>Chef Tony</button> 
                <input name="whatever" onClick={getAv} />
           </div>

        </div>
    )
}

export default MakeUser