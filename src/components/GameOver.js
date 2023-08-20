import React, { useContext } from 'react'
import { AppContext } from '../App'

function GameOver() {
    const {gameOver, currAttempt, setGameOver, correctWord } = useContext(AppContext)

    const reload = () => {
        window.location.reload()
    }

  return (
    <div className='gameOver'>
        <h3 className='winState'>{gameOver.guessedWord ? "YOU CORRECTLY GUESSED" : "SORRY"}</h3>
        <h1 className='correctTxt'> THE CORRECT ANSWER IS: "{correctWord.toUpperCase()}"</h1>
        {gameOver.guessedWord & (<h3> Guessed in {currAttempt.attempt} Attempts </h3>)}
        <br></br>
        <button className='tryBtn' onClick={reload}>TRY AGAIN</button>
    </div>
  )
}

export default GameOver