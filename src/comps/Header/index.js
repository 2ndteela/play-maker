import React, { Component } from 'react';
import './style.css';


class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div className="header-body">
                <div className="header-actions">
                    {this.props.children}
                </div>
            </div>
         );
    }
}
 
export default Header;