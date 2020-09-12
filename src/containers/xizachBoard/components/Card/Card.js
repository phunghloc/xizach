import React from 'react';

import './Card.css';

const symbols = ['♥', '♦', '♣', '♠'];

const card = (props) => {
    let [number, symbol] = props.item;
    if (number === 11 ) number = 'J';
    else if (number === 12 ) number = 'Q';
    else if (number === 13 ) number = 'K';
    else if (number === 1) number = 'A';

    return (
        <div className="card-card">
            <div className="card-item">
                <p className = {symbol < 2 ? 'card-item-red' : null}> {number}{symbols[symbol]} </p>
            </div>
        </div>
    );
};

export default card;