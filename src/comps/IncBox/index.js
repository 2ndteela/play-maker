import React, { Component } from 'react';
import "./style.css"

class IncBox extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    typedChange(val) {
        this.props.callback(val)
    }

    change(val) {
        let temp = this.props.val
        temp += val

        this.props.callback(temp)
    }

    render() { 
        return ( 
            <div className="inc-box">
                <button onClick={() => this.change(1)} >+</button>
                <input value={this.props.val} onChange={ e => this.typedChange(e.target.value)} ></input>
                <button onClick={() => this.change(-1)}>-</button>
            </div>
        );
    }
}
 
export default IncBox;