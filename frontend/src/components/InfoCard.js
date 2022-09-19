import React from "react";

function InfoCard({data}) {

    return(
             <div className="userData">
                     <h3 className="centered">{data.user.UserName}</h3>
                     <img className="avatarPic" src={data.avatar} /> 
                     <p className="centered">
                     Name: {data.user.ActualName} <br />
                     Pronouns: {data.user.Pronouns} <br />
                     Website: {data.user.Website} <br />
                     <br />
                     {data.user.Description}
                     </p>
                 </div>
    )
}

export default InfoCard