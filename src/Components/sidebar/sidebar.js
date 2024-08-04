import React from 'react';
import './sidebar.css';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="logo">
                <h1>CloneSpot</h1>
            </div>
            <nav>
                <ul>
                    <li><a href='#'>Home</a></li>
                    <li><a href='#'>Your Library</a></li>
                </ul>
            </nav>
            <div className='playlists'>
                <h2>Playlists</h2>
                <ul>
                    <li><a href='#'>Top Hits</a></li>
                    <li><a href='#'>Discover Weekly</a></li>
                    <li><a href='#'>Liked Songs</a></li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;