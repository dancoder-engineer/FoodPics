import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {

    const history = useNavigate()

    useEffect(() => handleLogout())

    function handleLogout() {
        fetch("/logoutback/")
        .then(res => res.json())
        .then(() => history("/login/") )
    }
    


    return(
        <div></div>
    )

}

export default Logout