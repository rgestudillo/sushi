// Key.js
import React from 'react';

const Key = ({ keyValue, onPress }) => {


    // You can pass additional Tailwind CSS classes through the color prop
    return (
        <button
            className={`text-white font-bold py-2 px-4 rounded bg-slate-200 dark:bg-slate-600 hover:bg-slate-300 active:bg-slate-400    `}
            onClick={() => onPress(keyValue)}
        >
            {keyValue}
        </button>
    );
};

export default Key;
