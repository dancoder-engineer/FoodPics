import React, {useState} from "react";
import {useNavigate} from 'react-router-dom'

function Login() {
    const [sendData, setSendData] = useState({})
    const [errorMessage, setErrorMessage] = useState(null)
    
    const history = useNavigate() 

    function handleChange(e) {
        setSendData({
            ...sendData,
            [e.target.id]: e.target.value
        })
    }

    function handleClick() {
        
        fetch("/loginback/", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(sendData)
        })
        .then(res => res.json())
        .then(data => { 
            if (data.user) {
                history('../')
            }
            else {
                setErrorMessage(data.error)
            }
        })
    }

    function goReg() {
        history('/register/')
    }



return(
    <div className="loginPage">
        <img className="backImg" alt="" src="https://imgur.com/Qe3LN4l.png" />
        <div className="loginInfo">
            <h1>Login</h1>
            Username: <input id="username" onChange={handleChange} /> <br />
            Password: <input type="password" id="password" onChange={handleChange} />
            <br /> <br />
            <button onClick={handleClick}>Submit</button><br />
            {errorMessage} <br />
        </div>
            <div className="goRegister" onClick={goReg}>
                <br />Register
            </div>
    </div>
)
}

export default Login