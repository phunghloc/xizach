import React from 'react';

import './MainBoard.css';
import PlayerBoard from './PlayerBoard/PlayerBoard';
import AiBoard from './AiBoard/AiBoard';

const mainBoard = (props) => (
    <div className="mainboard-mainboard">
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
);

export default mainBoard;