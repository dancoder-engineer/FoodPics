import './Qb.css';
import { useState, useEffect } from 'react';

import DivMessage from "./DivMessage.js"
import DivYesNo from "./DivYesNo.js"
import DivMultipleChoice from "./DivMultipleChoice.js"

function SSGMain() {

  let curr = {}

  const [text, setText] = useState(null)
  const [options, setOptions] = useState(null)
  const [showFileLoad, setShowFileLoad] = useState("shown")
  const [showGame, setShowGame] = useState("unshown")
  const [title, setTitle] = useState("")
  const [divs, setDivs] = useState([])
  let flags = {}
  let gdsData = []


  useEffect(() => initialSetup(), [])

  function initialSetup(){
    fetch("./SS-GDS.json")
    .then((res) => res.json())
    .then((jsonData) => {
      gdsData = jsonData.data
      setTitle(jsonData.title)
      setup("0")
    })
  }

  function setup(lbl) { 

    let newDiv

    curr = getPlace(lbl)
    console.log(curr)

    if(divs.length == 1 && lbl == "0") { return 0 }
    if(curr.type === "multiplechoice") {
      newDiv = <DivMultipleChoice data={curr} onChange={handleChangeDropdown} pl={divs.length}/>
    }

    if(curr.type === "message") {
      newDiv = <DivMessage data={curr} />
    }

    if(curr.type === "yesno") {
      newDiv = <DivYesNo data={curr} onChange={handleChangeButton} pl={divs.length}/>
    }

      let divList = divs
      divList.push(newDiv)
  //    console.log(divList)
      setDivs([...divList])

  }

  function checkFlags(curr) {
    // Set a flag to something
    //    ["set", "weapon", "dagger"]
    // If the flag (weapon) is (dagger), go to (36), or else go to (37)
    //    ["send", "weapon", "dagger", "36", "37"]
    if (curr.instructions[0] === "set") { flags[curr.instructions[1]] = curr.instructions[2] }
    if (curr.instructions[0] === "send") { flags[curr.instructions[1]] === curr.instructions[2] ? setup(curr.instructions[3]) : setup(curr.instructions[4])}
  }

  function makeText(text) {
    let pars = text.split('\n')
    setText(pars.map((i, index) => <p key={index}>{i}</p>))
  }

  function getPlace(lbl) { 
    return (gdsData.find(i => i.label === lbl))
  }

  function clickOption(e) {
    setup(curr.labels[parseInt(e.target.id)])
  }

  function makeOptions(info) { 
      let opts = info.options.map((i, index) => {
          return(
          <div key={index}>
            <button id={index} className='centered' onClick={clickOption}>{i}</button><br />
          </div>
          )
    })
      setOptions(opts)
  }

  function handleChangeDropdown(e) {
   

  let divList = divs

   while(divList.length > parseInt(e.target.id)+1) {
      
      divList.pop()
   }

    setDivs([...divList])
    setup(e.target.value)
  }



  function handleChangeButton(e) {
    //console.log(e.target.id)
    let strs = e.target.id.split("-")
 
    let divList = divs
 
    while(divList.length > parseInt(strs[1])+1) {
      // console.log("a")
       divList.pop()
    }
 
     setDivs([...divList])
     setup(strs[0])
   }



  return (
    
    <div>
      {divs && divs}
    </div>
  );
}

export default SSGMain;
