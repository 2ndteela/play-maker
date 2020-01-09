import React, { Component } from 'react';

import "./style.css"

class Player extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            active: false,
            x: 0,
            y: 0
        }
    }

    activate() {
        this.setState({
            active: true
        })
    }

    handleMove(e) {
        e.preventDefault()
        if (e.changedTouches && e.changedTouches.length) {
            const touch = e.changedTouches[0];
            this.props.callback(touch, this.props.idx, this.props.isHome)
        }
    }

    deactivate() {
        this.setState({
            active: false
        })
    }

    render() { 
        return ( 
            <div 
            style={{left: this.props.x, top: this.props.y, touchAction: 'none' }}
            className={this.state.active ? "player-div active" : "player-div"} 
            onTouchStart={() => this.activate()} 
            onTouchMove={(e) => this.handleMove(e)}
            onTouchEnd={()=>this.deactivate()}></div>
         );
    }
}
 
export default Player;