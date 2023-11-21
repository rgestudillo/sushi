// Tiles.js
import React from 'react';

const Tile = ({ letter, colorClass }) => {
    return (
        <div className={`w-12 h-12 flex items-center justify-center m-1 border-2 ${colorClass}`}>
            <span className="text-xl uppercase">{letter}</span>
        </div>
    );
};

const Tiles = ({ wordData, numOfTiles, borderColor }) => {
    // Ensure wordData is an array with objects that have a 'letter' and 'colorClass' key.
    const tiles = wordData.map((tile, index) => ({
        letter: tile.letter || '', // Set default letter to empty if not provided
        colorClass: tile.colorClass || borderColor // Use provided colorClass or default borderColor
    }));

    return (
        <div className="flex justify-center my-4">
            {tiles.slice(0, numOfTiles).map((tile, index) => (
                <Tile
                    key={index}
                    letter={tile.letter}
                    colorClass={tile.colorClass}
                />
            ))}
        </div>
    );
};

export default Tiles;
