import './Qb.css';
import { useState, useEffect } from 'react';

function DivYesNo({data, onChange, pl}){

    const[buttons, setButtons] = useState([])

    useEffect(() => setButtons(makeButtons()), [])



    function makeButtons(){
        return(
            <div>
                <button id={data.labels[0] + "-" + pl} onClick={onChange}>Yes</button>
                <button id={data.labels[1] + "-" + pl} onClick={onChange}>No</button>
            </div>
        )
    }

    return(
        <div>
            <p>{data.text}</p>
            {buttons && buttons}
        </div>
    )
}

export default DivYesNo