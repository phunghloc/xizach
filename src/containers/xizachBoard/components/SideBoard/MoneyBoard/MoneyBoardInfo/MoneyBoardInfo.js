import React from 'react';

const moneyBoardInfo = (props) => (
    <div className="MoneyBoard-info">
        <p>Số dư tài khoản</p>
        <p> ${props.money} </p>
    </div>
);

export default moneyBoardInfo;