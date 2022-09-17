import { useState } from "react";
import { DirectUpload } from 'activestorage';
import React from "react";

function MakeUser() {


    const [sendThis, setSendThis] = useState(null)
    const [img, setImg] = useState(null)

    let saltBae = {
        UserName: "Chef Tony Stark as Portrayed by Antonio Banderas",
        password: "salt",
        password_confirmation: "salt",
        ActualName: "Salt Bae",
        Description: "I'm famous for putting salt on solid gold that you will put in your body and will go straight into your shitter undigested, so you can literally flush solid gold down yout toilet to prove how rich you are.",
        Pronouns: "He/Him",
        Website: "http://www.saltbae.com/",
        avatar: ""
}



let chefBen = {
        UserName: "Chef Ben Shapiro",
        password: "mywifeisadoctor",
        password_confirmation: "mywifeisadoctor",
        ActualName: "It's not Ben Shapiro... At least I THINK it's not...",
        Description: "I, who am married to a doctor, am most famous for bombarding the internet will a million videos of myself. If you finsh watching one, any algorithm will show you everything I upload and you will literally never see anything else! Did I mention my wife's a doctor? Because she is.",
        Pronouns: "I'm right wing. I don't do this!",
        Website: "http://www.toiletpaperusa.com/",
        avatar: ""
}

let users=[saltBae, chefBen]


    function handleChange(e) {
        let val = parseInt(e.target.value)

        switch(e.target.id) {
            case "userNo":
                setSendThis(chefBen)
                break
            case "file":
                setSendThis({
                        ...sendThis,
                        avatar: e.target.files[0]
                    })
            
                } 
        
        console.log(e.target.id)
    }

    function handleClick() {

        fetch("/users/", {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              'accept': 'application/json' 
            },
            body: JSON.stringify(sendThis)
          })
          .then(res => res.json())
          .then(data => {
          //  console.log(data)
            uploadFile(sendThis.avatar, data)
        })
    }

    function uploadFile(file, user) {
        const upload = new DirectUpload(file, '/rails/active_storage/direct_uploads')
        upload.create((error, blob) => {
            if (error) {console.log(error)}
            else {
            //    console.log("Error free's the way to be! Cowabunga!")
            fetch("/addavatar/" + user.id, {
                method: 'PUT',
                headers: { 
                  'Content-Type': 'application/json',
                  'accept': 'application/json' 
                },
                body: JSON.stringify({avatar: blob.signed_id})
              })
              .then(res => res.json())
              .then(data => {
                console.log("with avatar", data)
                setImg(data.avatar_url)
              })
            }
        })
    }

    function getAv() {
        fetch("/users/1")
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setImg(data.avatar)
        })
    }



    return(
        <div>
            <h1>Make User</h1>
            User no.: <input id="userNo" type="number" min="1" max="2" onChange={handleChange} /> <br />
            File: <input id="file" type="file" onChange={handleChange} /> <br />
            <br />
            <button onClick={handleClick}>Submit</button><br />
            <br />
            <button onClick={getAv}>Get Avatar</button>
            {img && <img src={img} /> }
        </div>
    )
}

export default MakeUser