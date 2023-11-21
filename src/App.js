import React, { useState } from 'react';
import WordleGame from "./pages/WordleGame";
import A from "./assets/A.png";
import B from "./assets/B.png";
import C from "./assets/C.png";
import D from "./assets/D.png";
import E from "./assets/E.png";
import F from "./assets/F.png";

export default function App() {
  const [words, setWords] = useState({ Player1: '', Player2: '' });
  const [showPassword, setShowPassword] = useState({ Player1: false, Player2: false });
  const [playGame, setPlayGame] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add any validation for words here if needed
    setPlayGame(true);
  };

  const handleChange = (event) => {
    setWords({ ...words, [event.target.name]: event.target.value });
  };

  const handlePasswordVisibility = (word) => {
    setShowPassword(prevShowPassword => ({ ...prevShowPassword, [word]: !prevShowPassword[word] }));
  };

  if (playGame) {
    return <WordleGame word1={words.Player1} word2={words.Player2} />;
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-b from-yellow-500 to-white">
      <img className="fixed -right-[255px] -bottom-[450px]" src={C} alt="C" />
      <img className="fixed -left-[305px] -bottom-[250px]" src={B} alt="B" />
      <img className="fixed -left-[200px] -top-[400px]" src={D} alt="D" />
      <img className="fixed -right-[200px] -top-[300px]" src={A} alt="A" />
      {/* <img className="fixed  -top-[50px]" src={F} alt="F" />
      <img className="fixed  -bottom-[180px]" src={E} alt="E" /> */}
      <div className="w-full max-w-md p-8 space-y-6 z-50">
        <form onSubmit={handleSubmit} className="space-y-4">
          {['Player1', 'Player2'].map((word) => (
            <div key={word}>
              <label htmlFor={word} className="block text-sm font-medium text-gray-700">{word}</label>
              <div className="mt-1 relative">
                <input
                  type={showPassword[word] ? "text" : "password"}
                  name={word}
                  id={word}
                  value={words[word]}
                  onChange={handleChange}
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
              Play Game
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
