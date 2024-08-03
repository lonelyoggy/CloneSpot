import React from 'react';
import Card from '../card/card';
import './main.css';

const Main = () => {
    return (
        <div className="content">
            <h2>Good Afternoon</h2>
            <div className='card-container'>
                <Card title="Playlist 1" />
                <Card title="Playlist 2" />
                <Card title="Playlist 3" />
                <Card title="Playlist 4" />
                <Card title="Playlist 5" />
                <Card title="Playlist 6" />
            </div>
        </div>
    );
};

export default Main;