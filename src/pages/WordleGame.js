import React, { useState } from 'react';
import Keyboard from '../components/Keyboard';
import Tiles from '../components/Tiles';

const Game = ({ word1, word2 }) => {
    const numOfTiles = word1 && word2 ? Math.max(word1.length, word2.length) : 0;
    const emptyGuess = { letter: '', colorClass: 'bg-white' }; // Define a single empty guess tile
    const initialGuesses = Array(6).fill(null).map(() => Array(numOfTiles).fill(emptyGuess)); // Create 6 rows of empty tiles
    const [isInputDisabled, setIsInputDisabled] = useState(false);

    const [playerInputs, setPlayerInputs] = useState({
        player1: initialGuesses,
        player2: initialGuesses
    });

    const [currentPlayer, setCurrentPlayer] = useState('player1');
    const [currentAttempt, setCurrentAttempt] = useState({
        player1: 0, // Start at the first attempt
        player2: 0  // Start at the first attempt
    });


    const handleKeyPress = (key) => {
        if (isInputDisabled) return;
        setPlayerInputs(prevInputs => {
            // Clone the previous inputs to avoid direct state mutation
            const newInputs = JSON.parse(JSON.stringify(prevInputs));

            // Get the current guess for the current player
            const currentGuess = newInputs[currentPlayer][currentAttempt[currentPlayer]];

            if (key === 'DELETE') {
                // Find the last non-empty tile index
                let tileToDelete = currentGuess.findIndex(tile => tile.letter === '');
                // If all tiles are empty, tileToDelete will be -1; start deleting from the end in that case
                tileToDelete = tileToDelete > 0 ? tileToDelete - 1 : numOfTiles - 1;

                // Set the tile to empty
                newInputs[currentPlayer][currentAttempt[currentPlayer]][tileToDelete] = { letter: '', colorClass: 'bg-white' };
            } else if (key !== 'ENTER' && key !== 'DELETE') {
                // Find the first empty tile index or use the last tile if the guess is full
                const currentTileIndex = currentGuess.findIndex(tile => tile.letter === '') !== -1
                    ? currentGuess.findIndex(tile => tile.letter === '')
                    : numOfTiles - 1;

                // Replace the letter at the current position with the new key
                newInputs[currentPlayer][currentAttempt[currentPlayer]][currentTileIndex] = { letter: key, colorClass: '' };
            }

            return newInputs;
        });
    };

    const switchPlayer = () => {
        // Move to the next attempt and flip to the opposite player
        setCurrentAttempt(prevAttempt => ({
            ...prevAttempt,
            [currentPlayer]: prevAttempt[currentPlayer] + 1
        }));
        setCurrentPlayer(currentPlayer === 'player1' ? 'player2' : 'player1');
        setIsInputDisabled(false);
    }

    const submitGuess = () => {
        // Compare the current guess to the target word
        const targetWord = currentPlayer === 'player1' ? word1 : word2;
        let guess = playerInputs[currentPlayer][currentAttempt[currentPlayer]].map(tile => tile.letter).join('');
        let newInputs = { ...playerInputs };
        let guessEvaluation = evaluateGuess(guess, targetWord);
        // Update the tiles with the color class based on evaluation
        newInputs[currentPlayer][currentAttempt[currentPlayer]] = guessEvaluation;
        setPlayerInputs(newInputs);
        setIsInputDisabled(true);
    };

    // Helper function to evaluate the guess against the target word
    const evaluateGuess = (guess, targetWord) => {
        guess = guess.toLowerCase();
        targetWord = targetWord.toLowerCase();
        console.log("GUESS IS: ", guess)
        console.log("TARGET WORD IS: ", targetWord);
        return [...guess].map((letter, index) => {
            if (letter === targetWord[index]) {
                return { letter, colorClass: 'bg-green-500' }; // Correct letter and position
            } else if (targetWord.includes(letter)) {
                return { letter, colorClass: 'bg-orange-500' }; // Correct letter, wrong position
            } else {
                return { letter, colorClass: 'bg-red-500' }; // Wrong letter
            }
        });
    };

    const borderColor = currentPlayer === 'player1' ? 'border-yellow-500' : 'border-blue-500';
    // Determine if the submit button should be disabled

    const isSubmitDisabled = playerInputs[currentPlayer][currentAttempt[currentPlayer]].some(tile => tile.letter === '');
    return (
        <div className="app flex flex-col items-center justify-center h-screen">
            {playerInputs[currentPlayer].map((wordData, index) => (
                <Tiles
                    key={`${currentPlayer}-${index}`}
                    wordData={wordData}
                    numOfTiles={numOfTiles}
                    borderColor={borderColor}
                />
            ))}
            <Keyboard onKeyPress={handleKeyPress} />
            <div className='flex flex-row space-x-5'>
                <button
                    onClick={submitGuess}
                    className={`mt-4 bg-green-500 text-white py-2 px-4 rounded ${isSubmitDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={isSubmitDisabled}
                >
                    Submit Guess
                </button>
                <button
                    onClick={switchPlayer}
                    className={`mt-4 bg-green-500 text-white py-2 px-4 rounded ${isSubmitDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={isSubmitDisabled}
                >
                    Switch Player
                </button>
            </div>

        </div>
    );
};

export default Game;
