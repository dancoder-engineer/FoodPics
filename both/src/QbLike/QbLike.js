import './Qb.css';
import { useState } from 'react';

function QbLike() {

  let curr = {}
  const [text, setText] = useState(null)
  const [options, setOptions] = useState(null)
  const [showFileLoad, setShowFileLoad] = useState("shown")
  const [showGame, setShowGame] = useState("unshown")
  const [gameTitle, setGameTitle] = useState("")
  let flags = {}
  let gameData = []

  function setup(lbl) { console.log(curr)
    curr = getPlace(lbl)
    makeText(curr.text)
    makeOptions(curr)
    if (curr.instructions) { checkFlags(curr) }
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
    return (gameData.find(i => i.label === lbl))
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

  function handleChange(e) {
    const fileReader = new FileReader()
    fileReader.readAsText(e.target.files[0])
    fileReader.onload = () => {
      let data = JSON.parse(fileReader.result)
      gameData = data.gameData
      setGameTitle(data.gameTitle)
      setShowFileLoad("unshown")
      setShowGame("shown")
      setup("0")
    }
  }

  return (
    
    <div>
      <br /><br /><br /><br /><br />
      <div className={showFileLoad}>
        <input type="file" className='centered' onChange={handleChange} />
      </div>
      <div className={showGame}>
    <div className="App"><br />
      <h1 className='centered'>{gameTitle}</h1><br />
      <div id="text">
        {text && text}
      </div><br />
      <div id="options">
        {options && options}
      </div>
    </div>
    </div>
    
    </div>
  );
}

export default QbLike;
