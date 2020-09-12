import React from 'react';

import './MainBoard.css';
import PlayerBoard from './PlayerBoard/PlayerBoard';
import AiBoard from './AiBoard/AiBoard';
import Notify from './Notify/Notify';

const mainBoard = (props) => {
    let notify = null;
    if (props.result) {
        notify = <Notify notice={props.result} />
    }

    return (
        <div className="mainboard-mainboard">
            {notify}
            <AiBoard 
                play = {props.play}
                cards = {props.aiCards} 
                total = {props.totalAi}
                aiTurn = {props.aiTurn}
            />
            <PlayerBoard
                play = {props.play}
                cards = {props.playerCards} 
                total = {props.totalPlayer}
            />

        </div>
    )
};

export default mainBoard;