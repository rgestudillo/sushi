import React, { useState } from 'react';
import WordleGame from "./pages/WordleGame";
import A from "./assets/A.png";
import B from "./assets/B.png";
import C from "./assets/C.png";
import D from "./assets/D.png";
import E from "./assets/E.png";
import F from "./assets/F.png";

export default function App() {
  const [players, setPlayers] = useState({ player1Name: '', player2Name: '' });
  const [words, setWords] = useState({ word1: '', word2: '' });
  const [showPassword, setShowPassword] = useState({ word1: false, word2: false });
  const [playGame, setPlayGame] = useState(false);

  const resetGame = () => {
    setPlayGame(false);
    setWords({ word1: '', word2: '' });
    setPlayers({ player1Name: '', player2Name: '' });
    // Reset password visibility if necessary
  };

  const handleStartGame = (event) => {
    event.preventDefault();
    // Add validation for players' names and words here if needed
    if (players.player1Name && players.player2Name && words.word1 && words.word2) {
      setPlayGame(true);
    } else {
      // Handle the error state here
    }
  };

  const handlePlayerChange = (event) => {
    setPlayers({ ...players, [event.target.name]: event.target.value });
  };

  const handleWordChange = (event) => {
    setWords({ ...words, [event.target.name]: event.target.value });
  };

  const handlePasswordVisibility = (word) => {
    setShowPassword(prevShowPassword => ({ ...prevShowPassword, [word]: !prevShowPassword[word] }));
  };

  if (playGame) {
    return (
      <WordleGame
        player1Name={players.player1Name}
        player2Name={players.player2Name}
        word1={words.word1}
        word2={words.word2}
        onReset={resetGame}
      />
    );
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-b from-yellow-500 to-white">
      <img className="fixed -right-[155px] -bottom-[250px]" src={C} alt="C" />
      <img className="fixed -left-[155px] -bottom-[250px]" src={B} alt="B" />
      <img className="fixed -left-[170px] -top-[200px]" src={D} alt="D" />
      <img className="fixed -right-[200px] -top-[200px]" src={A} alt="A" />
      {/* <img className="fixed  -top-[50px]" src={F} alt="F" />
      <img className="fixed  -bottom-[180px]" src={E} alt="E" /> */}
      <div className="w-full max-w-md p-8 space-y-6 z-50">
        <form onSubmit={handleStartGame} className="space-y-4">
          {['player1Name', 'player2Name'].map(player => (
            <div key={player}>
              <label htmlFor={player} className="block text-sm font-medium text-gray-700">{`Player ${player === 'player1Name' ? '1' : '2'} Name`}</label>
              <input
                type="text"
                name={player}
                id={player}
                value={players[player]}
                onChange={handlePlayerChange}
                className="mt-1 block w-full border border-black rounded-md shadow-sm text-lg p-2"
                required
              />
            </div>
          ))}
          {['word1', 'word2'].map(word => (
            <div key={word}>
              <label htmlFor={word} className="block text-sm font-medium text-gray-700">{`Word for ${players[word === 'word1' ? 'player1Name' : 'player2Name'] || `Player ${word === 'word1' ? '1' : '2'}`}`}</label>
              <div className="mt-1 relative">
                <input
                  type={showPassword[word] ? "text" : "password"}
                  name={word}
                  id={word}
                  value={words[word]}
                  onChange={handleWordChange}
                  className="block w-full border border-black rounded-md shadow-sm text-lg p-2 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => handlePasswordVisibility(word)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                >
                  {showPassword[word] ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>
          ))}
          <div className="flex justify-center">
            <button type="submit" className="px-4 py-2 bg-black text-white rounded-lg w-[50%]">
              Start Game
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}