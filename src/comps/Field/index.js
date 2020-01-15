import React, { Component } from 'react';
import './style.css'

import Player from '../Player'
import Menu from '../Menu'

class Field extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            homeTeam: [{ x: 200, y: 200}],
            awayTeam: [],
            teamSize: 7,
            formation: 'fiveStack',
            ctx: null,
            playerWidth: 0,
            fieldWidth: 0,
            fieldHeight: 0
        }
        this.handleMove = this.handleMove.bind(this)
        this.updateTeam = this.updateTeam.bind(this)
    }

    updateState(value, feild) {
        this.setState({
            [feild]: value
        })
    }

    updateTeam(value) {
        this.updateState(value, 'teamSize')
    }

    handleMove(touch, idx, isAway) {

        const screenWidth = window.screen.width;
        const screenHeight = window.screen.height;
        const containerWidth = document.getElementById('field-container').clientWidth
        const playerWidth = document.querySelector('.player-div').clientWidth

        const xOffset = (screenWidth - containerWidth + playerWidth) / 2
        const yOffset = 48 + (playerWidth)

        const xLimit = (screenWidth/2 + containerWidth/2) - xOffset
        const yLimit = screenHeight - 48 - (playerWidth)

        let newX = (touch.pageX - xOffset) > -(playerWidth/2) ? (touch.pageX - xOffset) : -(playerWidth/2)
        let newY = (touch.pageY - yOffset) > -(playerWidth/2) ? (touch.pageY - yOffset) : -(playerWidth/2)

        newX = newX > xLimit ? xLimit : newX
        newY = newY > yLimit ? yLimit : newY

        if(isAway) {
            
            const arr = [...this.state.awayTeam]
            arr[idx] = {
                x: newX,
                y: newY
            }

            this.setState({
                awayTeam: arr
            })
        }
        else {
            const arr = [...this.state.homeTeam]
            arr[idx] = {
                x: newX,
                y: newY
            }

            this.setState({
                homeTeam: arr
            })
        }

    }

    setup() {
        const home = this.fiveStack()

        this.setState({
            homeTeam: home,
            awayTeam: this.makeDefense(home)
        })
    }


    fiveStack() {
        const homeArr = []
        let currentHeight = this.state.screenHeight * (1/2)

        for(let i = 0; i < this.state.teamSize - 2; i++) {
            homeArr.push({
                    x: ( this.state.fieldWidth - this.state.playerWidth) / 2 ,
                    y: currentHeight
                })
            currentHeight -= (this.state.playerWidth * 2)
        }

        homeArr.unshift({
            x: (this.state.fieldWidth - this.state.playerWidth) / 5,
            y: this.state.screenHeight * (3/5)
        })

        homeArr.unshift({
            x: (this.state.fieldWidth - this.state.playerWidth) / 2,
            y: this.state.screenHeight * (13/20)
        })

        return homeArr
    }

    sixStack(containerWidth, playerWidth, screenHeight) {
        const homeArr = []
        let currentHeight = screenHeight * (11/20)

        for(let i = 0; i < this.state.teamSize - 1; i++) {
            homeArr.push({
                    x: (containerWidth - playerWidth) / 2 ,
                    y: currentHeight
                })
            currentHeight -= (playerWidth * 2)
        }

        homeArr.push({
            x: (containerWidth - playerWidth) / 2,
            y: screenHeight * (28/40)

        })

        return homeArr
    }

    hoStack() {

    }

    sideStack() {

    }

    makeDefense(home) {
        const away = []
        home.forEach(p => {
            away.push({
                x: p.x - (this.state.playerWidth * 1.5),
                y: p.y
            })
        })
        return away
    }

    startDraw(e) {
        console.log('start')

        let touch

        if (e.changedTouches && e.changedTouches.length) {
            touch = e.changedTouches[0];
            console.log(touch)
        }
    }

    moveDraw(e) {

    }

    endDraw(e) {

    }

    componentDidMount() {
        const screenHeight = window.screen.height;
        const containerWidth = document.getElementById('field-container').clientWidth
        const canvas = document.getElementById('field-drawer')
        const ctx = canvas.getContext('2d')

        console.log(screenHeight, containerWidth)

        this.setState({
            fieldWidth: containerWidth,
            fieldHeight: screenHeight,
            ctx: ctx
        })

        this.setup()
    }

    render() { 
        return ( 
            <div id="field-container">
                <Menu teamSize={this.state.teamSize} teamCallBack={this.updateTeam} ></Menu>
                <div className="field-zone" id="endzone-1"></div>
                <div className="field-zone" id="field-body">
                    <div className="brick-mark" id="top-brick"></div>
                    <div className="brick-mark" id="bottom-brick"></div>
                </div>
                <div className="field-zone" id="endzone-2"></div>

                    {this.state.homeTeam.map( (p, i) => (
                        <Player 
                            away={false}
                            x={p.x} 
                            y={p.y} 
                            idx={i} 
                            key={i + '-hp'} 
                            callback={this.handleMove} 
                        ></Player>
                    ))}

                    {this.state.awayTeam.map( (p, i) => (
                        <Player 
                            away={true}
                            x={p.x} 
                            y={p.y} 
                            idx={i} 
                            key={i + '-ap'} 
                            callback={this.handleMove} 
                        ></Player>
                    ))}
                    

                <canvas id="field-drawer" 
                onTouchStart={e => this.startDraw(e)} 
                onTouchMove={e => this.moveDraw(e)} 
                onTouchEnd={e => this.endDraw(e)}></canvas>
            </div>
         );
    }
}
 
export default Field;