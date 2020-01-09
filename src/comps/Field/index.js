import React, { Component } from 'react';
import './style.css'

import Player from '../Player'
import Menu from '../Menu'

class Field extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            homeTeam: [
                {
                    x: 200,
                    y: 50
                }
            ],
            awayTeam: [],
            teamSize: 7,

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

    handleMove(touch, idx, isHome) {

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

        if(isHome) {
            
            const arr = [...this.state.homeTeam]
            arr[idx] = {
                x: newX,
                y: newY
            }

            this.setState({
                homeTeam: arr
            })
        }
        else {

        }

    }

    setup() {

        const screenWidth = window.screen.width;
        const screenHeight = window.screen.height;
        const containerWidth = document.getElementById('field-container').clientWidth
        const playerWidth = document.querySelector('.player-div').clientWidth

        this.setState({
            homeTeam: this.fiveStack(containerWidth, playerWidth, screenHeight)
        })
    }


    fiveStack(containerWidth, playerWidth, screenHeight) {
        const homeArr = []
        let currentHeight = screenHeight * (11/20)

        for(let i = 0; i < this.state.teamSize - 2; i++) {
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

        homeArr.push({
            x: (containerWidth - playerWidth) / 5,
            y: screenHeight * (25/40)

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

    componentDidMount() {
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
                            isHome={true}
                        ></Player>
                    ))}
                    

                <canvas id="field-drawer"></canvas>
            </div>
         );
    }
}
 
export default Field;