import React, { Component } from 'react';
import './style.css'

import MaterialIcon from 'material-icons-react'

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
                <button id="burger" className="fab-button" onClick={() => this.toggleMenu()}>
                    <MaterialIcon icon="keyboard_arrow_down" color='#fff' ></MaterialIcon>
                </button>
                <div id="slide-out" className={this.state.open ? 'open' : ''}>
                    <div className="row-div">
                        {this.props.children}
                    </div>
                </div>
            </div>
         );
    }
}
 
export default Menu;