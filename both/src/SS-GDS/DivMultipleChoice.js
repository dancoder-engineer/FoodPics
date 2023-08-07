import './SSGDS.css';
import { useState, useEffect } from 'react';

function DivMultipleChoice({data, onChange, pl}){


    const[box, setBox] = useState()

 //   data = data.data
    

    useEffect(() => {
        clearBox()
        if(box) { document.getElementById(pl).selectedIndex = 0 }
        setBox(makeBox())
        
       
    },[data.options])



    function clearBox(){ setBox(null) }

    function makeBox(){

      //  <option value="volvo">Volvo</option>

        let options = data.options.map((i, idx) => <option value={data.labels[idx]}>{i}</option>)
        let fullopt = (
        
            <div>
                <select id={pl} name={data.label} onChange={onChange}>
                    <option value="jhgmgjh"> </option>
                    {options}
                </select>
            </div>
            
        )

        return fullopt

    }

    return(
        <div>
            <div className='question'>
                <p>{data.text}</p>
            </div>
            <div className='content'>
                {box && box}
            </div>
        </div>
    )
}

export default DivMultipleChoice