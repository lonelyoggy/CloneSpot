import React from 'react';

const Player = () => {
    return (
        <div className="player">
            <div className="now-playing">
                <img src="song.jpg" alt="Song"/>
                <div className='song-info'>
                    <span>Song Title</span>
                    <span>Artist Name</span>
                </div>
            </div>
            <div className='controls'>
                <button>Previous</button>
                <button>Play</button>
                <button>Next</button>
            </div>
            <div className='volume'>
                <span>Volume</span>
                <input type="range" min="0" max="100"/>
            </div>
        </div>
    );
};

export default Player;