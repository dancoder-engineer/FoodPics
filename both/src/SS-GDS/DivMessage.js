import './SSGDS.css';
import { useState, useEffect } from 'react';

function DivMessage({data}){ 

    const[text, setText] = useState()

    useEffect(() => {
        makeText()
    }, [data.text])

    
    function makeText(){

        let txt = data.text.map((i, idx) => <p key={idx}>{i}</p>)


        setText(<div>{txt}</div>)
    }

    return(
        <div className='content'>
            {text && text}
        </div>
    )
}

export default DivMessage