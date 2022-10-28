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

        return data.map((i) => { return (
        <div key={i.user}>
            <div className="convoList" key={i.user}>
                <div className="col1comm" onClick={toUser}>
                    <img id={i.user} className="miniPicOnPostcomm" src={i.avatar} /><br />
                    {i.user}<br />
                </div>
            
            <div className="col2comm" id={i.otheruser} onClick={toConvo}>
                {i.content}
            </div><br />
            </div><br />
        </div>
        )})

        }

        else{

            return (<h1 className="centered">No private messages yet.</h1>)
        }
    }


    return(
        <div className="followingsPage">
            <img className="backImg" src="https://imgur.com/5b8Jev2.png" />
            <div className="headerHere"><Header /></div>
            <div className="individualUsers">
                <br />
                {convos && convos}
            </div><br /><br /><br /><br />
        </div>
    )
}

export default PrivateMessageList