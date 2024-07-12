//CSS
import './App.css';

//REACT
import { useCallback, useEffect, useState } from 'react';

//DATA
import {wordsList} from './data/words';

//COMPONENTS
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/GameOver';

const stages = [
  {id: 1, name: "start"},
  {id: 2, name: "game"},
  {id: 3, name: "end"},
]

 const guessesQuantity = 5;

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  const [pickedWord, setPickedWord] = useState('');
  const [pickedCategory, setPickedCategory] = useState('');
  const [letters, setLetters] = useState([]);

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(guessesQuantity);
  const [score, setScore] = useState(0);

  const pickWordAndCategory = useCallback(() =>{
    const categories = Object.keys(words);
    const randomCategory = categories[Math.floor(Math.random() * Object.keys(categories).length)];

    const word = words[randomCategory][Math.floor(Math.random() *  words[randomCategory].length)];

    return {word, randomCategory};
  },[words]);
  
  const startGame = useCallback(() => {
      clearLetterStates();

      const {word, randomCategory} = pickWordAndCategory();
      
      let wordLetters = word.split('');
      wordLetters = wordLetters.map((l) => l.toLowerCase());
      
      setPickedWord(word);
      setPickedCategory(randomCategory);
      setLetters(wordLetters);
  }, [pickWordAndCategory]);

  const buttonStartGame = () => {
    setGameStage(stages[1].name);
    startGame();
  }

  // process the letter input
  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase();

    if(guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)){
      return;
    }

    if(letters.includes(normalizedLetter)){
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter
      ]);
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter
      ]);
      
      setGuesses((actualGuesses) => actualGuesses - 1);
    }
  }

  const clearLetterStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  }

  useEffect(() => {
    if(guesses <= 0){
      clearLetterStates()
      setGameStage(stages[2].name);
    }
  }, [guesses]);

  useEffect(() => {
    const uniqueLetters = [...new Set(letters)];

    if(guessedLetters.length === uniqueLetters.length){
      setScore((actualScore) => actualScore + 100);
      startGame();
    }
    
}, [guessedLetters, letters, startGame])

  const retry = () => {
    setScore(0)
    setGuesses(guessesQuantity)

    setGameStage(stages[0].name);
  }

  return (
    <div className="App">
      {gameStage === 'start' && <StartScreen buttonStartGame={buttonStartGame}/>}
      {gameStage === 'game' && 
        <Game verifyLetter={verifyLetter} 
        pickedWord={pickedWord} 
        pickedCategory={pickedCategory} 
        letters={letters}
        guessedLetters={guessedLetters}
        wrongLetters={wrongLetters}
        guesses={guesses}
        score={score}
        />}
      {gameStage === 'end' && <GameOver retry={retry} score={score}/>}
    </div>
  );
}

export default App;
