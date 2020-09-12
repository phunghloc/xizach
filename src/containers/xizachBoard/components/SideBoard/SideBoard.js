import React from 'react';

import './SideBoard.css';
import MoneyBoard from './MoneyBoard/MoneyBoard'

const sideBoard = (props) => (
    <div className="sideboard-sideboard">
        <MoneyBoard 
            money = {props.money} 
            betMoney = {props.betMoney}
            moneyOnBet = {props.moneyOnBet}
        />
        <button onClick = {props.newGame}> Game mới </button>
        <button onClick = {props.clicked}> Bốc bát họ! </button>
        <button onClick = {props.aiCardsHandler}> Thôi! </button>
        
    </div>
);

export default sideBoard;