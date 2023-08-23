import './SSGDS.css';
import { useState, useEffect } from 'react';

function DivYesNo({data, onChange, pl}){

    const[buttons, setButtons] = useState([])

    useEffect(() => setButtons(makeButtons()), [data.text])



    function makeButtons(){
        return(
            <div>
                <button id={data.labels[0] + "-" + pl + "-" + data.label} onClick={onChange}>Yes</button><span>   </span>   
                <button id={data.labels[1] + "-" + pl + "-" + data.label} onClick={onChange}>No</button>
            </div>
        )
    }

    return(
        <div>
            <div className='question'>
                <p>{data.text}</p>
            </div>
            <div className='content'>
                {buttons && buttons}
            </div>
        </div>
    )
}

export default DivYesNo