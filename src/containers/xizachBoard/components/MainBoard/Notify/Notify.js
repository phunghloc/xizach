import React from 'react';

import './Notify.css';

const notify = (props) => {
    let param = 'CHẠY';
    let classes = 'draw';
    if (props.notice === 'win') {
        param = 'THẮNG';
        classes = 'win';
    } else if (props.notice === 'lose') {
        param = 'THUA';
        classes = 'lose';
    }

    return (
        <div className={["Notify", `Notify-${classes}`].join(' ')}>
            <p>{param}</p>
        </div>
    );
}

export default notify;