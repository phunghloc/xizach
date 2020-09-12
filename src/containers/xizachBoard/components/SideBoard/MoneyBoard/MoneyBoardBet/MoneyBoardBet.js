import React from 'react';

const moneyBoardBet = (props) => {
    const money = [100, 200, 500, 1000, 2000, 5000];
    return (
        <>
            <div className="MoneyBoard-bet">
                {money.map(betMoney => {
                    return (
                        <button 
                            key = {betMoney}
                            onClick = {() => props.betMoney(betMoney)}
                        >
                            {betMoney}
                        </button>
                    );
                })}


            </div>
            <div className="MoneyBoard-TotalBet">
                <p>Tổng số tiền đang đặt:</p>
                <p> ${props.moneyOnBet ? props.moneyOnBet : 0} </p>
            </div>
        </>
    );
}

export default moneyBoardBet;