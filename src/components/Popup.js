import React, { useEffect } from 'react';
import { checkWin } from '../helpers/helpers';

const Popup = ({ correctLetters, wrongLetters, selectedWord, setPlayable, playAgain, continueGame }) => {
    let finalMessage = '';
    let finalMessageRevealWord = '';
    let playable = true;
    let winStatus = checkWin(correctLetters, wrongLetters, selectedWord);

    if (winStatus === 'win') {
        finalMessage = 'Congratulations! You Won! 😃';
        playable = false;
    } else if (winStatus === 'lose') {
        finalMessage = 'Unfortunately You Lose 🙁';
        finalMessageRevealWord = `The word was ${selectedWord}`;
        playable = false;
    }

    useEffect(() => setPlayable(playable));

    return (
      <div className="popup-container" style={finalMessage !== '' ? {display:'flex'} : {}}>
        <div className="popup">
          <h2>{finalMessage}</h2>
          <h3>{finalMessageRevealWord}</h3>
          {checkWin(correctLetters, wrongLetters, selectedWord) === 'win' && 
            <>
              <button onClick={continueGame} style={{ marginRight: '10px' }}>Continue</button>
              <button onClick={playAgain}>Play Again</button>
            </>
          }
          {checkWin(correctLetters, wrongLetters, selectedWord) === 'lose' && 
            <button onClick={playAgain}>Play Again</button>
          }
        </div>
      </div>
    );
    
}

export default Popup;
