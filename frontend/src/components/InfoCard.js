import React from "react";

function InfoCard({data}) {

    function handleClick(e){
        let xPos = e.pageX - e.target.offsetLeft
//        let yPos = e.pageY - e.target.offsetTop
//        let picSize = [e.target.clientWidth, e.target.clientHeight]
        let halfwayPoint = e.target.clientWidth / 2
//        console.log(xPos, yPos)
        console.log(xPos > halfwayPoint) //if false, clicked on the left half, if true, clicked on the right half
    
    }

    return(
             <div className="userData">
                     <h3 className="centered">{data.user.UserName}</h3>
                     <img className="avatarPic" src={data.avatar} onClick={handleClick}/> 
                     <p className="centered">
                     Name: {data.user.ActualName} <br />
                     Pronouns: {data.user.Pronouns} <br />
                     Website: {data.user.Website} <br />
                     <br />
                     {data.user.Description}
                     </p>
                     <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                 </div>
    )
}

export default InfoCard