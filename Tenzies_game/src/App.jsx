import Die from "./components/Die";
import Counter from "./components/Counter";
import { useState } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";



function App() {
  //Use state to store the die values
  const [dice, setDice] = useState(generateAllNewDice());
  const [count, setCount] = useState(0);

  // Create a variable gameWon to handle the win condition
  const gameWon = dice.every((die) => die.isHeld && die.value === dice[0].value);

  // console.log(gameWon)

  // Render the die components with the values
  const dieElements = dice.map((die) => {
    return (
      <Die 
        value={die.value}
        key={nanoid()}
        hold={() => hold(die.id)}
        isHeld={die.isHeld}
      />
    );
  }) 

  // Generate a random number between 1 and 6
  function generateAllNewDice() {
    const randomNumbers = [];
    for (let i = 0; i < 10; i++) {
      randomNumbers.push({
        value: Math.floor(Math.random() * 6) + 1,
        isHeld: true,
        id: nanoid()
      });
    }
    return randomNumbers;
  }

  // Create a function to roll the dice
  function rollDice() {
    // check to reroll dice
    if (!gameWon) {
      incrementCount();
      setDice(prevDice => prevDice.map((die) => {
        return die.isHeld ? die : {
          ...die,
          value: Math.floor(Math.random() * 6) + 1,
        }
      }));
    } else {
      setCount(0);
      setDice(generateAllNewDice());
    }
  }

  function resetDice() {
    setDice(generateAllNewDice());
    setCount(0);
  }

  function hold(id) {
    return (
      setDice(prevDice => prevDice.map((die) => {
        return die.id === id ? {
          ...die,
          isHeld: !die.isHeld
        } : die
      }))
    );
  }

  function incrementCount() {
    setCount(prevCount => prevCount + 1);
  }

  return (
    <>  
      <Counter count={count}/>
      <main className="main-container">
        {gameWon && <Confetti />}
        <div className="interface-container">
          <h1>Tenzies</h1>
          <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
          <div className="dice-container" key={nanoid()}>
            {dieElements}
          </div>
          <div className="button-container">
            <button onClick={rollDice}>{gameWon ? "New Game" : "Roll"}</button>
            <button onClick={resetDice}>Reset</button>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
