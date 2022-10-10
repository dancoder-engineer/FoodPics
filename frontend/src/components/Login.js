import React, {useState, useEffect} from "react";
import {useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import store from "./Redux/store.js";
import Header from './Header.js'

function Login() {
    const dispatch = useDispatch();
    const [sendData, setSendData] = useState({})
    const [errorMessage, setErrorMessage] = useState(null)
    const user = useSelector((state) => state.user.id);
    const history = useNavigate() 

    
    store.subscribe(() => console.log(user))

    function handleChange(e) {
        setSendData({
            ...sendData,
            [e.target.id]: e.target.value
        })
    }

    function handleClick() {
        
        fetch("/login/", {
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

    function makeFeed() {
        fetch('/makefeed/')
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })
    }

return(
    <div>
        <Header loginPage={"true"}/>
        <h1>Login</h1>
        Username: <input id="username" onChange={handleChange} /> <br />
        Password: <input type="password" id="password" onChange={handleChange} />
        <br /> <br />
        <button onClick={handleClick}>Submit</button><br />
        {errorMessage}
    </div>
)
}

export default Login