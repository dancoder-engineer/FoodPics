import React, {useState} from "react";

function Login() {

    const [sendData, setSendData] = useState({})

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
        .then(data => console.log(data))
    }

    function makeFeed() {
        fetch('/makefeed/')
        .then(res => res.json())
        .then(data => console.log(data))
    }

return(
    <div>
        <h1>Login</h1>
        <button onClick={makeFeed}>Make feed</button>
        Username: <input id="username" onChange={handleChange} /> <br />
        Password: <input type="password" id="password" onChange={handleChange} />
        <br /> <br />
        <button onClick={handleClick}>Submit</button>
    </div>
)
}

export default Login