import './App.css';
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Figure from './components/Figure';
import WrongLetters from './components/WrongLetters';
import Word from './components/Word';
import Popup from './components/Popup';
import Notification from './components/Notification';
import Keyboard from './components/Keyboard';
import { showNotification as show } from './helpers/helpers';

const words = ['Counter Stike', 'Red Dead Redemption', 'Fortnite', 'Call of Duty', 'Mario', 'Zelda', 'Tetris', 'God of War', 'Spiderman', 'Sonic', 'Rocket League', 'Smash Bros',
'Overwatch', 'Apex Legends', 'Witcher', 'Portal', 'Fifa', 'Dead by Daylight', 'Forza', 'Destiny', 'Rainbow Six Siege', 'Grand Theft Auto', 'Paladins', 'Resident Evil', 'Need For Speed', 'Among us'];

function App() {
  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setwrongLetters] = useState([]);
  const [showNotification, setshowNotification] = useState(false);
  const [score, setScore] = useState(() => Number(localStorage.getItem('score') || 0));
  const [selectedWord, setSelectedWord] = useState(words[Math.floor(Math.random() * words.length)].toLowerCase());

  const handleNewWord = word => {
    const lowercasedWord = word.toLowerCase();
    setSelectedWord(lowercasedWord);
    const spaces = word.split('').filter(letter => letter === ' ');
    setCorrectLetters(spaces);
  }

  useEffect(() => {
    handleNewWord(words[Math.floor(Math.random() * words.length)]);
  }, []);

  const handleLetter = (letter) => {
    if (playable) {
      if (selectedWord.includes(letter)) {
        if (!correctLetters.includes(letter)) {
          setCorrectLetters(currentLetters => [...currentLetters, letter]);
          setScore(prevScore => prevScore + 10);
        } else {
          show(setshowNotification);
        }
      } else {
        if (!wrongLetters.includes(letter)) {
          setwrongLetters(wrongLetters => [...wrongLetters, letter]);
          setScore(prevScore => prevScore - 5);  // Deduct points for incorrect guess
        } else {
          show(setshowNotification);
        }
      }      
    }
  }

  useEffect(() => {
    const handleKeydown = event => {
      const { key, keyCode } = event;
      if (playable && keyCode >= 65 && keyCode <= 90) {
        handleLetter(key.toLowerCase());
      }
    }
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [correctLetters, wrongLetters, playable]);

  useEffect(() => {
    localStorage.setItem('score', score);
  }, [score]);

  const playAgain = () => {
    // Reset correct and wrong letters
    setCorrectLetters([]);
    setwrongLetters([]);

    // Reset the score to 0
    setScore(0); 

    // Get a new word using the handleNewWord function
    handleNewWord(words[Math.floor(Math.random() * words.length)]);

    // Ensure game is playable
    setPlayable(true);
}


  const continueGame = () => {
    handleNewWord(words[Math.floor(Math.random() * words.length)]);
    setPlayable(true);
    setwrongLetters([]);
  }

  return (
    <>
      <Header />
      <div className="score-display">Score: {score}</div>  
      <div className='game-container'>
        <Figure wrongLetters={wrongLetters} />
        <WrongLetters wrongLetters={wrongLetters} />
        <Word selectedWord={selectedWord} correctLetters={correctLetters} />
        <Keyboard 
          handleKeyClick={handleLetter} 
          correctLetters={correctLetters} 
          wrongLetters={wrongLetters} 
        />
      </div>
      <Popup 
        correctLetters={correctLetters} 
        wrongLetters={wrongLetters} 
        selectedWord={selectedWord} 
        setPlayable={setPlayable} 
        playAgain={playAgain}
        continueGame={continueGame}
      />
      <Notification showNotification={showNotification} />
    </>
  );
}

export default App;
