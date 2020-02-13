import React, { Component } from 'react';
import MaterialIcon from 'material-icons-react'
import './style.css'

import Player from '../Player'
import Menu from '../Menu'
import Header from '../Header'

class Field extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            homeTeam: [{ x: 200, y: 200}],
            awayTeam: [],
            frisbee: {},
            eraser: {},
            teamSize: 7,
            formation: 'sixStack',
            ctx: null,
            playerWidth: 0,
            fieldWidth: 0,
            fieldHeight: 0,
            draw: true,
            touchDown: false,
            lastX: 0,
            lastY: 0
        }
        this.handleMove = this.handleMove.bind(this)
        this.updateTeam = this.updateTeam.bind(this)
    }

    updateState(value, feild) {
        this.setState({
            [feild]: value
        })
    }

    toggleDraw() {
        this.setState({
          draw: !this.state.draw
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

        if(idx === -1) {
            const frisbee = {
                x: newX,
                y: newY
            }

            this.setState({
                frisbee: frisbee
            })
        }

        else if(isAway) {
            
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
            awayTeam: this.makeDefense(home),
        }, () => this.clacFrisbee())
    }

    clacFrisbee() {
        const home = {...this.state.homeTeam[0]}
        const frisbee = {}

        frisbee.x = home.x + 15
        frisbee.y = home.y - 10

        this.setState({
            frisbee: frisbee
        })

    }


    fiveStack() {
        const homeArr = []
        let currentHeight = this.state.fieldHeight * (1/2)

        for(let i = 0; i < this.state.teamSize - 2; i++) {
            homeArr.push({
                    x: ( this.state.fieldWidth - this.state.playerWidth) / 2 ,
                    y: currentHeight
                })
            currentHeight -= (this.state.playerWidth * 2)
        }

        homeArr.unshift({
            x: (this.state.fieldWidth - this.state.playerWidth) / 5,
            y: this.state.fieldHeight * (3/5)
        })

        homeArr.unshift({
            x: (this.state.fieldWidth - this.state.playerWidth) / 2,
            y: this.state.fieldHeight * (13/20)
        })

        return homeArr
    }

    sixStack() {


        const homeArr = []
        let currentHeight = this.state.fieldHeight * (11/20)

        for(let i = 0; i < this.state.teamSize - 1; i++) {
            homeArr.push({
                    x: (this.state.fieldWidth - this.state.playerWidth) / 2 ,
                    y: currentHeight
                })
            currentHeight -= (this.state.playerWidth * 2)
        }

        homeArr.unshift({
            x: (this.state.fieldWidth - this.state.playerWidth) / 2,
            y: this.state.fieldHeight * (28/40)

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
        let touch
        const ctx = this.state.ctx

        if (e.changedTouches && e.changedTouches.length) {
            touch = e.changedTouches[0];
            
            const x = touch.clientX - this.state.xOffset + this.state.playerWidth/2
            const y = touch.clientY - this.state.yOffset + this.state.playerWidth/2

            ctx.moveTo(x, y)
            this.setState({
                lastX: x,
                lastY: y,
                touchDown: true
            }, () => { this.moveEraser(touch) })
        }
    }

    moveDraw(e) {
        const ctx = this.state.ctx
        let touch
        ctx.lineJoin = ctx.lineCap = 'round'

        if (e.changedTouches && e.changedTouches.length) {
            touch = e.changedTouches[0];
 
            const x = touch.clientX - this.state.xOffset + this.state.playerWidth/2
            const y = touch.clientY - this.state.yOffset + this.state.playerWidth/2
            
            if(this.state.draw) {
                ctx.globalCompositeOperation = 'source-over'
                ctx.lineWidth = this.state.playerWidth / 8
                ctx.strokeStyle = '#000'
            }
            else {
                ctx.globalCompositeOperation = 'destination-out'
                ctx.lineWidth = 41
                ctx.strokeStyle = '#297a12'
            }
            ctx.beginPath()
            ctx.moveTo(this.state.lastX, this.state.lastY)
            ctx.lineTo(x, y)

            ctx.stroke()

            this.setState({
                lastX: x,
                lastY: y
            })

            this.moveEraser(touch)
        }

    }

    endDraw(e) {
        this.moveDraw(e)
        this.state.ctx.stroke()
        this.setState({
            touchDown: false
        })
    }

    clearDraw() {
        this.state.ctx.clearRect(0, 0, this.state.fieldWidth, this.state.fieldHeight)
    }

    componentDidMount() {
        const container = document.getElementById('field-container')
        const screenHeight = window.screen.height;
        const containerWidth = container.clientWidth
        const playerWidth = document.querySelector('.player-div').clientWidth
        const canvas = document.getElementById('field-drawer')
        const ctx = canvas.getContext('2d')
        const screenWidth = window.screen.width;
        const xOffset = (screenWidth - containerWidth + playerWidth) / 2
        const yOffset = 48 + (playerWidth)

        canvas.width = containerWidth
        canvas.height = container.clientHeight

        this.setState({
            fieldWidth: containerWidth,
            fieldHeight: screenHeight,
            playerWidth: playerWidth,
            ctx: ctx,
            xOffset: xOffset,
            yOffset: yOffset,
            resetFunction: this.fiveStack
        }, () => this.setup())

        
    }

    moveEraser(touch) {
        if(this.state.touchDown && !this.state.draw) {
            const e = {...this.state.eraser}
            const x = touch.clientX - this.state.xOffset - 8
            const y = touch.clientY - this.state.yOffset - 14

            e.x = x + 'px'
            e.y = y + 'px'

            this.setState({
                eraser: e
            })
        }
    }

    showEraser() {
        if(this.state.touchDown && !this.state.draw) 
            return <div style={{top: this.state.eraser.y, left: this.state.eraser.x}} id="eraser-circle"></div>
        
        else
            return null
    }

    resetPlayers() {
        let home = []
        let def = []

        if(this.state.formation === 'sixStack') home = this.sixStack()

        else if (this.state.formation === 'hoStack') {

        }

        else home = this.fiveStack()
        

        def = this.makeDefense(home)

        this.setState({
            homeTeam: home,
            awayTeam: def
        }, () => this.clacFrisbee())    
    }

    render() { 
        return ( 
            <div id="field-wrapper">
                <Header>
                    <Menu>
                        <button onClick={() => this.resetPlayers()} >reset</button>
                        <button onClick={() => this.clearDraw()} >clear</button>
                    </Menu>
                    <button className={ this.state.draw ? "hidden-button" : "hidden-button flipped-icon"} onClick={() => this.toggleDraw()} >
                        <MaterialIcon icon="create" color="#fff" ></MaterialIcon>
                    </button>
                </Header>
                <div id="field-container">
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
                        
                    <Player 
                        away={false}
                        x={this.state.frisbee.x}
                        y={this.state.frisbee.y}
                        idx={-1}
                        callback={this.handleMove}
                    >

                    </Player>

                    <canvas 
                    id="field-drawer" 
                    onTouchStart={e => this.startDraw(e)} 
                    onTouchMove={e => { this.moveDraw(e) }} 
                    onTouchEnd={e => this.endDraw(e)}></canvas>
                    
                    {this.showEraser()}

                </div>
            </div>
         );
    }
}
 
export default Field;