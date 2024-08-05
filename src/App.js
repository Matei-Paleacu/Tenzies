import React from "react"
import Die from "./components/Die.js"
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'

function App() {
  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)

  React.useEffect(() => {
    const allHold = dice.every(die => die.isHeld === true)
    const firstVal = dice[0].value
    const sameVal = dice.every(die => die.value === firstVal)
    if (allHold && sameVal){
      setTenzies(true)
    }
}, [dice])

  function generateNewDie(){
    return {
      value: Math.ceil(Math.random() * 6), 
      isHeld:false,
      id:nanoid()
    }
  }

  function allNewDice(){
    const arr = []
    while (arr.length < 10){
      arr.push(generateNewDie())
    }
    return arr
  }

  function newRoll(){
    setDice(prevDice => prevDice.map(die => {
      return die.isHeld ? 
        die :
        generateNewDie()
    }))
  }

  function newGame(){
    setTenzies(false)
    setDice(allNewDice())
  }

  function holdDice(diceId){
    setDice(prevDice => prevDice.map(die => {
        return die.id === diceId ? 
          {...die,isHeld:!die.isHeld} : die
      }
    )) 
  }
  
  const diceElements = dice.map(die => 
  <Die key={die.id} value={die.value} isHeld={die.isHeld} hold={() => holdDice(die.id)}/>
  )

  return (
    <main>
      {tenzies && <Confetti/>}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze 
        it at its current value between rolls.</p>
      <div className="dice-container">
        {diceElements}
      </div>
      <button className="roll-dice" onClick={tenzies ? newGame : newRoll}>{tenzies ? "New Game" : "Roll"}</button>
    </main>
  );
}

export default App;
