import React from 'react'
import "./checkout.css"
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


const Checkout = (props) => {
    return (

        <div>
     
        
            <div className="info">
                <h1>Need A Charge?</h1>
                <h2>Dont leave your phone alone, take a battery with you!</h2>
                <p> Our portable chargers allow you to charge your phone from the convenience of.... anywhere!</p>
                <p> Now you do not have to worry about leaving your phone behind and hoping for the best.</p>
                <p>Keep your phone on you at all times so you can still take pictures, answer messages, and make calls!</p>
                <div className="cables">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/a/ac/Approve_icon.svg" className="check"></img>
                    <span className="cord">LIGHTNING CABLE</span>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/a/ac/Approve_icon.svg" className="check"></img>
                    <span className="cord">USB-C</span>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/a/ac/Approve_icon.svg" className="check"></img>
                    <span className="cord">MICRO USB</span>
                </div>
            </div>
           
            <div className="details">
                <img className="battery" src="https://cdn.dribbble.com/users/57484/screenshots/2071184/charging-battery-animated-gif.gif"></img>
                <div className="details2">
                   
                    <h3 className="detailheader">Here's How It Works!</h3>
                    <ul className="list">
                        <li>Only $1/hr</li>
                        <li>Comes Equipped With 3 Cord Options</li>
                        <li>$20 Max and its yours</li>
                        <li>Return To Any Kiosk When Done</li>
                        <li>Click Button Below To Rent!</li>

                    </ul>
                </div>
            </div>
            <div className="button">
                <button className="checkout" onClick={props.sendDataToApi}>Power Me Up!</button>
            </div>
        </div>

    )
}

export default Checkout