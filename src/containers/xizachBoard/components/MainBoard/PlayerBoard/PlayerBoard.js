import React from 'react';

import './PlayerBoard.css';
import Card from '../../Card/Card';

const playerBoard = (props) => {
    let scoreBar = null;
    let cards = [];

    let total = props.total;
    if (total === 21.5) {
        total = 'Xì Zách'
    } else if (total > 100) {
        total = `Ngũ Linh ${total%100}`;
    }

    if (props.play) {
        scoreBar =(
            <div className="playerBoard-score">
                <p> {total} </p>
            </div>);

            cards = props.cards.map((card, index) => {
                return <Card 
                    item = {card}
                    key = {index}
                    />
        })
        
        for (let i = 0; i < 2; i++) {
            if (cards.length < 2)
                cards.push(<div className="card-holder" key = {~~(Math.random()*10000)}></div>);
        }
    }


    return (
        <div className="playerBoard">
            {cards}
            {scoreBar}
        </div>
    );
}

export default playerBoard;