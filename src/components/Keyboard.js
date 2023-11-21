// Keyboard.js
import React from 'react';
import Key from './Key';

const Keyboard = ({ onKeyPress }) => {
    const rows = [
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
        ['DELETE', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'ENTER']
    ];

    return (
        <div className="keyboard">
            {rows.map((row, index) => (
                <div key={index} className="flex justify-center mb-1">
                    {row.map((keyValue) => (
                        <Key
                            key={keyValue}
                            keyValue={keyValue}
                            onPress={onKeyPress}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Keyboard;
