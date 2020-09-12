import React from 'react';

import './MoneyBoard.css';
import MoneyBoardInfo from './MoneyBoardInfo/MoneyBoardInfo';
import MoneyBoardBet from './MoneyBoardBet/MoneyBoardBet'

const moneyBoard = (props) => (
    <div className="MoneyBoard">
        <MoneyBoardInfo money = {props.money} />
        <MoneyBoardBet 
            total = {props.totalBet}
            betMoney = {props.betMoney}
            moneyOnBet = {props.moneyOnBet}
        />
    </div>
);

export default moneyBoard;