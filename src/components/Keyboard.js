import React from 'react';

const Keyboard = ({ handleKeyClick, correctLetters, wrongLetters }) => {

  const keyboardLayout = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm']
  ];

  const usedLetters = [...correctLetters, ...wrongLetters];

  return (
    <div className="keyboard-container">
  {keyboardLayout.map((row, rowIndex) => (
    <div key={rowIndex} className="key-row">
      {row.map(letter => (
        <button
          className="key"
          key={letter}
          onClick={() => handleKeyClick(letter)}
          disabled={usedLetters.includes(letter)}
        >
          {letter}
        </button>
      ))}
    </div>
  ))}
</div>

  );
};

export default Keyboard;
