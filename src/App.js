import './App.css';
import Board from './components/Board';
import Keyboard from './components/Keyboard';
import GameOver from './components/GameOver';
import { createContext, useEffect, useState} from "react";
import { boardDefault, generateWordSet } from "./Words";
export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setCurrAttempt] = useState({attempt: 0, letterPos: 0});
  const [wordSet, setWordSet] = useState(new Set())
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [gameOver, setGameOver] = useState({gameOver: false, guessedWord: false, });
  const [correctWord, setCorrectWord] = useState("");
  const [consecutiveCorrectAnswers, setConsecutiveCorrectAnswers] = useState(0);

  useEffect(() => {
    generateWordSet().then((words) => {
      console.log(words);
      setWordSet(words.wordSet);
      setCorrectWord(words.todaysWord);
    });
  }, []);

const onSelectLetter = (keyVal)=>{
  if (currAttempt.letterPos > 4) return;
  const newBoard = [...board]
  newBoard[currAttempt.attempt][currAttempt.letterPos] = keyVal;
  setBoard(newBoard)
  setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos + 1 })
}

const onDelete = ()=>{
  if (currAttempt.letterPos === 0) return;
  const newBoard = [...board]
newBoard[currAttempt.attempt][currAttempt.letterPos - 1] = "";
setBoard(newBoard)
setCurrAttempt({...currAttempt, letterPos: currAttempt.letterPos - 1 });
}

const onEnter = ()=>{
  if (currAttempt.letterPos !== 5) return;

let currWord = "";
for (let i = 0; i < 5; i++) {
  currWord += board[currAttempt.attempt][i].toLowerCase();
}

if (wordSet.has(currWord.toLowerCase())) {
  setCurrAttempt({attempt: currAttempt.attempt + 1, letterPos: 0 });
} else{ 
  alert("Not a Word!")
}

if (currWord.trim().toLowerCase() === correctWord.trim().toLowerCase()) {
  setGameOver({ gameOver: true, guessedWord: true })
  setConsecutiveCorrectAnswers(consecutiveCorrectAnswers + 1);
  return;
}

// If the player lost the game, reset the consecutiveCorrectAnswers state variable.
if (currAttempt.attempt === 5) {
  setGameOver({ gameOver: true, guessedWord: false })
  setConsecutiveCorrectAnswers(0);
  return;
}

};

  return (
    <div className="App">
      <nav>
      <h1>Kenny's Wordle</h1>
      </nav>
      <AppContext.Provider value={{ 
        board, 
        setBoard,
        currAttempt, 
        setCurrAttempt, 
        onSelectLetter, 
        onDelete, 
        onEnter,
        correctWord, 
        setDisabledLetters,
        disabledLetters,
        setGameOver,
        gameOver,
        consecutiveCorrectAnswers
        }}>
        <div className='game'>
      <Board/>
      {gameOver.gameOver ? <GameOver consecutiveCorrectAnswers={consecutiveCorrectAnswers} /> : <Keyboard/>}
      </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;