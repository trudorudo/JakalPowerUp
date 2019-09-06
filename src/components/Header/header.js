import React, { Component } from 'react';
import smallBattery from '../../images/small_battery.gif';
import "./header.css";

class Header extends Component {
    state = {}
    render() {
        return (
            <header>
                <img alt="" src="https://i.imgur.com/YuTOUd4.png" style={{ textAlign: "center", maxHeight: "5rem", maxWidth: "5rem" }} ></img>
                <div>
                    
                        <img className="gif" src={smallBattery} />
                    
                    <h1 className="scantext" style={{ textAlign: "center", color: "yellowgreen", display: "inline" }}>PowerUp</h1>
                    <h4 className="scantext" style={{ textAlign: "center", color: "red", display: "inline", fontStyle: "italic" }}>    By Jakal</h4>
                </div>
            </header>
        );
    }
}

export default Header;

