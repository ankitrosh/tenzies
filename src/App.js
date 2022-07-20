import logo from './logo.svg';
import './App.css';
import Main from "./components/Main"
import Dice from "./components/Dice"
import React from "react"
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'
function App() {


  const [dice, setDice] = React.useState(allNewDice())
  const [turns, setTurns] = React.useState(0)

  const [tenzies, setTenzies] = React.useState(false)

  React.useEffect( () =>{
    console.log("dice changed")
    const die = dice[0]
    let count =0;
    if(die.isHeld === true){
      for(let i=1;i<10;i++){
        if(dice[i].isHeld === true && die.value === dice[i].value){
          count = count +1;
        } else {
          break
        }
      }

      if(count === 9){
        setTenzies(true)
        console.log("you win")
      }

    }

  },[dice])

  function allNewDice() {
    const arr = []
    for(let i=0;i<10;i++){
      
      
      const obj = {
        value : Math.floor((Math.random() * 6) + 1),
        isHeld : false,
        id: nanoid()
      }
      arr.push(obj);
      
    }
    return arr
  }
  const allNewDiceDisplay = dice.map(newDice => {
    return (
        <Dice 
          value = {newDice.value}
          isHeld = {newDice.isHeld}
          changeHeld = {() => holdIt(newDice.id)}
         
        />
      )
  })

  function handleClick() {
    if(tenzies === false){
      setTurns(oldTurns => oldTurns+1)
      setDice(oldDice => oldDice.map(dice => {

        return dice.isHeld ? dice : {...dice, value: Math.floor((Math.random() * 6) + 1)}
      }))
    } else {
      setTurns(0)
      setDice(allNewDice())
      setTenzies(false)
    }
    
  }

  function holdIt(id) {
    
      setDice(oldDice => {
        return oldDice.map(dice => {
          return dice.id === id ? {...dice, isHeld: !dice.isHeld} : dice
        })
      })
  }

  return (
    <main>
    {tenzies && <Confetti />}
    <h1> Tenzies </h1>
    <h2> Turns used: {turns}</h2>
      <div className="allDice"> 
        {allNewDiceDisplay}
        
      </div>
      <button onClick={handleClick} className="rollDice"> {tenzies? "New Game" :"Roll!!!"} </button>
    </main>
  );
}

export default App;
