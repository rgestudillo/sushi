// Winner.js
import React, { useState, useEffect } from 'react';
import truthQuestions from '../constants/truth.json'; // Adjust the path to where your JSON file is located

const Winner = ({ winner, onReset }) => {
    const [currentQuestion, setCurrentQuestion] = useState('');

    // Function to fetch a random truth question
    const fetchRandomQuestion = () => {
        const randomIndex = Math.floor(Math.random() * truthQuestions.length);
        setCurrentQuestion(truthQuestions[randomIndex]);
    };

    // Fetch a new random question when the component mounts and when the "Next Question" button is clicked
    useEffect(() => {
        fetchRandomQuestion();
    }, []);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded-md shadow-xl text-center">
                <h2 className="text-2xl font-bold mb-2">Congratulations {winner}!</h2>
                <p className="mb-4">You win the game! Loser answers the question: </p>
                <p className="italic mb-4">"{currentQuestion}"</p>
                <button
                    onClick={fetchRandomQuestion}
                    className="bg-blue-500 text-white py-2 px-4 rounded mx-2"
                >
                    Next Question
                </button>
                <button
                    onClick={onReset}
                    className="bg-green-500 text-white py-2 px-4 rounded mx-2"
                >
                    Play Again
                </button>
            </div>
        </div>
    );
};

export default Winner;
