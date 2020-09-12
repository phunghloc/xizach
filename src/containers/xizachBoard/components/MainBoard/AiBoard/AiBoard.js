import React from 'react';

import './AiBoard.css';
import Card from '../../Card/Card';
import Spinner from '../../Spinner/Spinner';

const aiBoard = (props) => {
    let cards = [];
    let scoreBar = null;
    let loading = null;

    let total = props.total;
    if (total === 21.6) {
        total = 'Xì Zách';
    } else if (total > 100) {
        total = `Ngũ Linh ${total%100}`;
    }

    if (props.play) {
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

        scoreBar =(
            <div className="aiBoard-score">
                <p> {total} </p>
            </div>);
    }

    if (props.aiTurn)
        loading = (<div className="aiBoard-loading"> <Spinner /> </div>);

    return (
        <div className="aiBoard">
            {loading}
            {cards}
            {scoreBar}
        </div>
        );
}

export default aiBoard;