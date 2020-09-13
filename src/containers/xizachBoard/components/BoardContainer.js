import React, { Component } from 'react';

import './BoardContainer.css';
import MainBoard from './MainBoard/MainBoard';
import SideBoard from './SideBoard/SideBoard';

class boardContainer extends Component {
    // Chia lấy dư 13 => số lá. -> number ( 1 - 13)
    // Chia lấy nguyên 13 => chất. -> symbol ( 0 -> 4)
    // picked number*10 + symbol
    state = {
        firstPlay: true, //Lần loading đầu tiên
        ai: [], // bài của cái -> [1 - 13, 0 - 4]
        totalAi: 0, //tổng bài của cái
        player: [], // bài của người chơi
        totalPlayer: 0, //tổng bài của người chơi
        pickedCards: [], // các lá đã rút
        aiTurn: false, //Lượt bốc của AI
        playerMoney: 5000, //Tiền ban đầu của người chơi
        moneyOnBet: 0, // Tiền đang đặt để chơi
        canBet: true, //Có thể đặt tiền hay không
        canNewGame: true, //có thể bắt đầu chơi mới hay không.
        disabling: false, // disable các nút sau khi hạ bài
        result: 0, // kết quả mỗi ván. 0: chưa xong, draw: chạy, win: thắng, lose: thua.
    }

    componentDidMount() {
        this.newGameHandler(0);
    }

    // Rút thêm 1 lá
    playerCardHandler = () => {
        if (this.state.disabling) return ;

        if (!this.state.moneyOnBet) {
            alert("Đặt tiền đi rồi bốc ông nội!");
            return ;
        }
        this.setState({
            canNewGame: false,
        });

        const playerCards = [...this.state.player];
        const pickedCards = [...this.state.pickedCards];
        let totalPlayer = this.state.totalPlayer;
        
        const drawCard = () => {
            if (playerCards.length < 5 && totalPlayer < 30 && !this.state.firstPlay) {
                let randomNumber;
                let randomSymbol;
        
                do {
                    randomNumber = 1 + ~~(Math.random() * 13);
                    randomSymbol = ~~(Math.random() * 4);
                } while (pickedCards.includes(randomNumber*10 + randomSymbol));
    
                playerCards.push([randomNumber, randomSymbol]);
                pickedCards.push(randomNumber*10 + randomSymbol);
                totalPlayer += Math.min(randomNumber, 10);
            }
    
            this.setState({
                player: playerCards, 
                totalPlayer: totalPlayer,
                pickedCards: pickedCards,
                canBet: false,
            });
        }

        drawCard();
        if (playerCards.length < 2){
            drawCard();
        }
    }

    // Tạo 1 match game mới
    newGameHandler = () => {
        if (!this.state.canNewGame) {
            alert('Ai cho chơi game mới lúc này');
            return ;
        }

        this.setState({
            firstPlay: false,
            ai: [],
            totalAi: 0,
            player: [],
            totalPlayer: 0,
            pickedCards: [],
            moneyOnBet: 0,
            canBet: true,
            disabling: false,
            result: 0,
        })
    }

    //Bài của cái
    aiCardsHandler = () => {
        let totalPlayer = this.state.totalPlayer;

        if (this.state.player.length === 2 &&
            this.state.player.some(card => card[0] === 1) &&
            this.state.player.some(card => card[0] >= 10)) {
                totalPlayer = 21.5;
                this.setState({totalPlayer: totalPlayer})
            } else if (this.state.player.length === 5 && this.state.totalPlayer < 22) {
                totalPlayer = 21.6;
                this.setState({totalPlayer: this.state.totalPlayer + 100})
            }

        if (totalPlayer < 16) {
            if (totalPlayer) alert('Bạn phải trên 16 nút mới được thôi!');
            return ;
        }

        if (this.state.disabling) return ;
        this.setState({disabling: true});

        const cardsHandler = () => {
            const pickedCards = [...this.state.pickedCards];
            const aiCards = [...this.state.ai];
            let totalAi = this.state.totalAi;
            let randomNumber;
            let randomSymbol;
    
            do {
                randomNumber = 1 + ~~(Math.random() * 13);
                randomSymbol = ~~(Math.random() * 4);
            } while (pickedCards.includes(randomNumber*10 + randomSymbol));

            aiCards.push([randomNumber, randomSymbol]);
            pickedCards.push(randomNumber*10 + randomSymbol);
            totalAi += Math.min(randomNumber, 10);

            totalAiCard = totalAi;
            if (aiCards.length === 2 &&
                aiCards.some(card => card[0] === 1) &&
                aiCards.some(card => card[0] >= 10)) {
                    totalAiCard = 21.6;
                    this.setState({totalAi: totalAiCard});
            } else if (aiCards.length === 5 && totalAiCard < 22) {
                totalAiCard = 21.7;
                this.setState({totalAi: totalAi + 100});
            } else {
                this.setState({totalAi: totalAi});
            }
    
            this.setState({
                ai: aiCards,
                pickedCards: pickedCards,
            })
        }

        let totalAiCard = 0;
        this.setState({aiTurn: true});

        cardsHandler();
        
        let timer = setInterval(() => {
            // if (this.state.ai.length < 5 )
            if(totalAiCard < totalPlayer && totalPlayer < 22) {
                cardsHandler();
            }
            else if (totalPlayer >= 22 && totalAiCard < 15) {
                cardsHandler();
            }
            else if (totalAiCard === totalPlayer && totalAiCard <= 17 ) {
                    cardsHandler();
            }
            else {
                let playerMoney = this.state.playerMoney;
                let result = 'draw';

                if (totalPlayer >= 22) { // người chơi ngoắc
                    if (totalAiCard < 22){ // đủ nút ăn tiền
                        playerMoney -= this.state.moneyOnBet;
                        result = 'lose';
                    }
                } else {
                    if (totalAiCard >= 22){ // cái ngoắc
                        playerMoney += this.state.moneyOnBet;
                        result = 'win';
                    }
                    else { // <= 21 thì so nút
                        if (totalAiCard > totalPlayer){
                            playerMoney -= this.state.moneyOnBet;
                            result = 'lose';
                        }
                        else if (totalAiCard < totalPlayer){
                            playerMoney += this.state.moneyOnBet;
                            result = 'win';
                        }
                    }
                }

                clearInterval(timer);
                this.setState({
                    aiTurn: false,
                    playerMoney: playerMoney,
                    canNewGame: true,
                    result: result,
                });
            }
        }, 2000);

    }

    //Đặt tiền
    betMoneyHandler = (money) => {
        if (!this.state.canBet) {
            alert('Không thể đặt tiền vào lúc này!');
            return ;
        }
        
        if (money + this.state.moneyOnBet > this.state.playerMoney) {
            alert('Không đủ tiền mời nạp thêm!');
        } else {
            this.setState({moneyOnBet: this.state.moneyOnBet + money});
        }
    }

    render () {
        return (
            <div className="board-board">
                <MainBoard 
                    play = {!this.state.firstPlay}
                    playerCards = {this.state.player}
                    aiCards = {this.state.ai}
                    totalAi = {this.state.totalAi}
                    totalPlayer = {this.state.totalPlayer}
                    aiTurn = {this.state.aiTurn}
                    result = {this.state.result}
                />

                <SideBoard 
                    playerTotal = {this.state.totalPlayer}
                    clicked = {this.playerCardHandler} 
                    newGame = {this.newGameHandler}
                    aiCardsHandler = {this.aiCardsHandler}
                    money = {this.state.playerMoney}
                    betMoney = {this.betMoneyHandler}
                    moneyOnBet = {this.state.moneyOnBet}
                />
            </div>
        );
    }
}

export default boardContainer;