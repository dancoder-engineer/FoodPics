import React, {useEffect, useState} from "react";
import { useNavigate, useParams } from "react-router-dom";

import Header from './Header.js'

function MessageThread() {

    const params=useParams()
    const history=useNavigate()
    const [bubbles, setBubbles] = useState(null)
    const [ids, setIds] = useState(null)
    const [newMessage, setNewMessage] = useState(null)

    useEffect(() => {
        getMessagesFromServer()

    }, [])

    function getMessagesFromServer() {
        fetch("/messagethreadback/" + params.id)
        .then(res => res.json())
        .then(data => {
            if(data.error) {history('/login/')}
            else {
                setIds({
                    sender: data.myself.id,
                    recipient: data.otheruser.id,
                })
                setBubbles(makeBubbles(data))
                const element = document.getElementById("mainDiv");
                element.scrollTop = element.scrollHeight;
            }
        })
    }

    function makeBubbles(data) {
        console.log(data)
        return data.messages.map((i, index) => {
          //  let clss = data.myself.id === message.sender ? rightBubble : leftBubble

            if (data.myself.id === i.sender)
            {
                return(<div key={index}>
                    <div className="rightBubble">
                        <span>{i.content}</span> <img className="convoPicRight" alt="" src={data.myself.avatar} />
                    </div><br /></div>
            )}
            else
            {
                return(<div key={index}>
                    <div className="leftBubble">
                        <img className="convoPicLeft" alt="" src={data.otheruser.avatar} /> <span>{i.content}</span><br />
                    </div><br /></div>
            )}
        })
    }

    function handleChange(e) {
        setNewMessage(e.target.value)
    }


    function handleSubmit(e) {
        e.preventDefault()
        const sendMessage={
            sender: ids.sender,
            recipient: ids.recipient,
            content: newMessage
        }

        if(!newMessage.replaceAll(" ", "")) {return 0}
        
        fetch("/messages/", {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              'accept': 'application/json' 
            },
            body: JSON.stringify(sendMessage)
          })
          .then(res => res.json())
          .then(data => {

            console.log(data)
//            setBubbles(null)
            document.querySelector("#messageText").value = ""
            setNewMessage("")
            getMessagesFromServer()
            const element = document.getElementById("mainDiv");
            element.scrollTop = element.scrollHeight;
   //         uploadFile(sendThis.avatar, data)
        })
      //  console.log(sendMessage)
    }
    return(
        <div className="" id="mainDiv">
            <img className="backImg" alt="" src="https://imgur.com/5b8Jev2.png" />
            <div className="headerHere"><Header /></div>
            <br /><div>
            <div className="convo" id="convo">
                <br />
                {bubbles && bubbles}
                <textarea className="messagearea" id="messageText" onChange={handleChange}/>
                <button className="submitMessage" onClick={handleSubmit}>Submit</button><br />
            </div><br /><br /><br /><br /></div>
        </div>
    )
}

export default MessageThread