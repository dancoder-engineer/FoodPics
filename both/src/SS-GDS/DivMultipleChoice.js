import './Qb.css';
import { useState, useEffect } from 'react';

function DivMultipleChoice({data, onChange, pl}){


    const[box, setBox] = useState()

 //   data = data.data
    

    useEffect(() => setBox(makeBox()), [])

    function makeBox(){

      //  <option value="volvo">Volvo</option>

        let options = data.options.map((i, idx) => <option value={data.labels[idx]}>{i}</option>)

        return(
        
            <div>
                <select id={pl} name={data.label} onChange={onChange}>
                    <option value={data.label}>  </option>
                    {options}
                </select>
            </div>
        )

    }

    return(
        <div>
            <p>{data.text}</p>
            {box && box}
        </div>
    )
}

export default DivMultipleChoice