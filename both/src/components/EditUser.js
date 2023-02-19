
import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import './info.css'
import Header from './Header.js'
import {assembleData} from './sharedfunctions/assembleData.js'

function EditUser() {

    const history = useNavigate()



    const [userId, setUserId] = useState(null)
    const [sendingData, setSendingData] = useState({})

    useEffect(() => {
        youGetMe() 

        // place those values in sendingData
    },[])
  

    function youGetMe() {
        fetch('/getme/')
        .then(res => res.json())
        .then(data => {
            populateForm(data)
            setUserId(data.user.id)
        })
     }

     function populateForm(userData) { 
        document.querySelector("#UserName").value = userData.user.UserName
        document.querySelector("#ActualName").value = userData.user.ActualName
        document.querySelector("#Pronouns").value = userData.user.Pronouns
        document.querySelector("#Website").value = userData.user.Website
        document.querySelector("#Description").value = userData.user.Description
        setSendingData({
            UserName: userData.user.UserName,
            ActualName: userData.user.ActualName,
            Pronouns: userData.user.Pronouns,
            Website: userData.user.Website,
            Description: userData.user.Description
        })
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

        if (sendingData.avpic && sendingData.avatar) {
            formData.append('user[avatar]', sendingData.avpic, sendingData.avatar)
        }

        
            fetch('/users/'+userId, {
            method: 'put',
            body: formData
            })
            .then (res => res.json())
            .then (data => {
                console.log(data)
                history('/')

               
            })
    }




    function deleteAccount() {
        let reallyDel = window.confirm("Really delete your account?")
        if (!reallyDel) { return 0 }
        fetch('/users/'+userId, {
            method: 'delete'
            })
            .then (res => res.json())
            .then (() => history('/login/'))
    }



    return(
        
        <div className="editPage">
            
            <img className="backImg" alt="" src="https://imgur.com/i164KEC.png" />
            <div className="editHeader">
                <Header />
            </div>
            <div className="registerInfo">
                <h1>Edit User</h1>
                <form id="form">
                User Name: <input name="UserName" id="UserName" onChange={handleChange} /><br />
            <br /><br />
                Full Real Name: <input name="ActualName" id="ActualName" onChange={handleChange} /><br />
                Pronouns: <input name="Pronouns" id="Pronouns" onChange={handleChange} /><br />
                Website: <input name="Website" id="Website" onChange={handleChange} /><br /><br />
                Description: <textarea className="description" name="Description" id="Description" onChange={handleChange} /><br /><br />
                
                Avatar: <input type="file" id="avatar" name="avatar" onChange={handleChange} /> <br />
                <br />
                </form>
                <button onClick={handleSubmit}>Submit</button><br />
                <br />
            </div>

            <div className="deleteButton" onClick={deleteAccount}>
                <br /> Delete My Account
            </div>




        </div>
    )
}

export default EditUser


// Password: <input type="password" name="password" id="password" onChange={handleChange} /><br />
// Password: <input type="password" name="password_confirmation" id="password_confirmation" onChange={handleChange}  /><br />
