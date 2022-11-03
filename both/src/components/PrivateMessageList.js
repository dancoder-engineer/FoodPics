import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Header from './Header.js'

function PrivateMessageList(){
    const [convos, setConvos] = useState(null)
    const history = useNavigate() 

 

   
    useEffect(() => {
        fetch("/firstmessages/")
        .then(res => res.json())
        .then(data => {
            if(data.error) {history('/login/')}
            else {setConvos(makeConvos(data))}
        })

    }, [])

    function toUser(e) {
         history('/user/' + e.target.id)
     }

     function toConvo(e) {
        history("/messagethread/" + e.target.id)
     }

    function makeConvos(data) {

        if (data[0]){

        return data.map((i) => {  console.log(i) 
            return (
        <div key={i.user}>
            <div className="convoList" key={i.user}>
                <div className="col1comm" id={i.user} onClick={toUser}>
                    <img id={i.user} className="miniPicOnPostcomm" alt="" src={i.avatar} />
                    {i.user}<br />
                </div>
            
            <div className="col2comm" id={i.otheruser} onClick={toConvo}>
                {i.sender}: {i.content}
            </div><br />
            </div><br />
        </div>
        )})

        }

        else{

            return (
            <div className="centeredAndNice">
            <h1>No private messages yet.</h1>
            <p>If you wish to send someone a private message,<br />please go to their page and click "send a message."</p>
            </div>
            )
        }
    }


    return(
        <div className="followingsPage">
            <img className="backImg" alt="" src="https://imgur.com/5b8Jev2.png" />
            <div className="headerHere"><Header /></div>
            <div className="individualUsers">
                <br />
                {convos && convos}
            </div><br /><br /><br /><br />
        </div>
    )
}

export default PrivateMessageList