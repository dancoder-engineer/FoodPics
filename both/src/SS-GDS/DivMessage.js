import './Qb.css';
import { useState } from 'react';

function DivMessage({data}){ 

    return(
        <div>
            <p>{data.text}</p>
        </div>
    )
}

export default DivMessage