import React, { Component } from 'react';
import './style.css'

// import Input from '../Input'
import IncBox from '../IncBox'

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            open: false
        }

    }

    toggleMenu() {
        this.setState({
            open: !this.state.open
        })
    }

    render() { 
        return ( 
            <div id="menu-container">
                <div id="burger" onClick={() => this.toggleMenu()}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div id="slide-out" className={this.state.open ? 'open' : ''}>
                    <div className="row-div">
                        <h2># of Players</h2>
                        <IncBox label="# of Players" val={this.props.teamSize} callback={this.props.teamCallBack} ></IncBox>
                    </div>
                </div>
            </div>
         );
    }
}
 
export default Menu;