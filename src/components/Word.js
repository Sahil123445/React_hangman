import React from 'react';

function Word({ selectedWord, correctLetters }) {
  return (
    <div className='word'>
      {selectedWord.split('').map((letter, i) => {
        return (
          <span className={`letter ${letter === ' ' ? 'space' : ''}`} key={i}>
            {correctLetters.includes(letter.toLowerCase()) || letter === ' ' ? letter : ''}
          </span>
        );
      })}
    </div>
  )
}

export default Word;
