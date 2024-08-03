import React from 'react';
import './card.css';
const Card = ({ title }) => {
    return (
        <div className="card">
            {title}
        </div>
    );
};

export default Card;