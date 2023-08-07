import './SSGDS.css';
import { useState, useEffect } from 'react';

import DivMessage from "./DivMessage.js"
import DivYesNo from "./DivYesNo.js"
import DivMultipleChoice from "./DivMultipleChoice.js"

function SSGMain() {

  let curr = {}


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
    let divList = divs

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


  function getPlace(lbl) { 
    return (gdsData.find(i => i.label === lbl))
  }

  

  function handleChangeDropdown(e) {
    
   

    clearList(parseInt(e.target.id))

    setup(e.target.value)
  }



  function handleChangeButton(e) {

      let strs = e.target.id.split("-")
 
      clearList(parseInt(strs[1]))

      setup(strs[0])
   }



   function clearList(len){
    let divList = divs
 
    while(divList.length > len+1) {
       divList.pop()
    }
 
     setDivs(divList)

   }




  return (
    <div className='bg-div'>
      <div className='main-div'>
        {divs && divs}
      </div>
    </div>
  );
}

export default SSGMain;
