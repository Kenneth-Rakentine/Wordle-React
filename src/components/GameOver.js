import React, { useContext } from 'react'
import { AppContext } from '../App'

function GameOver() {
    const {gameOver, currAttempt, setGameOver, correctWord } = useContext(AppContext)

    const reload = () => {
        window.location.reload()
    }

  return (
    <div className='gameOver'>
        <h3>{gameOver.guessedWord ? "You Correctly Guessed" : "You Failed"}</h3>
        <h1>The Correct Answer is "{correctWord}"</h1>
        {gameOver.guessedWord & (<h3> Guessed in {currAttempt.attempt} Attempts </h3>)}
        <br></br>
        <button onClick={reload}>Try Again</button>
    </div>
  )
}

export default GameOver