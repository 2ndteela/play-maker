import React, { Component } from 'react';
import './style.css'

class Input extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div className="styled-input">
                <input ></input>
                <div className="styled-label">{this.props.label}</div>
            </div>
         );
    }
}
 
export default Input;