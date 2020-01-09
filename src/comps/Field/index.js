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

        const xOffset = (screenWidth - containerWidth + 24) / 2
        const yOffset = 48 + 12

        const xLimit = (screenWidth/2 + containerWidth/2) - xOffset
        const yLimit = screenHeight - 48 - 12;

        let newX = (touch.pageX - xOffset) > -12 ? (touch.pageX - xOffset) : -12
        let newY = (touch.pageY - yOffset) > -12 ? (touch.pageY - yOffset) : -12

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