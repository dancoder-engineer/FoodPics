import React, {useEffect, useState} from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import Header from './Header.js'

function MessageThread() {

    const params=useParams()
    const history=useNavigate()
    const [bubbles, setBubbles] = useState(null)

    useEffect(() => {
        fetch("/messagethread/" + params.id)
        .then(res => res.json())
        .then(data => {
            if(data.error) {history('/login/')}
            else {
                setBubbles(makeBubbles(data))
                const element = document.getElementById("mainDiv");
                element.scrollTop = element.scrollHeight;
            }
        })

    }, [])

    function makeBubbles(data) {
        console.log(data)
        return data.messages.map((i) => {
          //  let clss = data.myself.id === message.sender ? rightBubble : leftBubble

            if (data.myself.id === i.sender)
            {
                return(<div>
                    <div className="rightBubble">
                        <span>{i.content}</span> <img className="convoPic" src={data.myself.avatar} />
                    </div><br /></div>
            )}
            else
            {
                return(<div>
                    <div className="leftBubble">
                        <img className="convoPic" src={data.otheruser.avatar} /> <span>{i.content}</span><br />
                    </div><br /></div>
            )}
        })
    }


    return(
        <div className="" id="mainDiv">
            <img className="backImg" src="https://imgur.com/5b8Jev2.png" />
            <div className="headerHere"><Header /></div>
            <br /><div>
            <div className="convo" id="convo">
                <br />
                {bubbles && bubbles}
                {bubbles && bubbles}
                {bubbles && bubbles}    
                <textarea className="messagearea" />
                <button className="submitMessage">Submit</button><br />
            </div><br /><br /><br /><br /></div>
        </div>
    )
}

export default MessageThread