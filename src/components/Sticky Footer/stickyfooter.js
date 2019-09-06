import React, { Component } from 'react'
import { Link } from "react-router-dom";
import 'react-dropdown/style.css'
import "./footer.css";
import MaterialIcon, {colorPalette} from 'material-icons-react';


class Footer extends Component {
    state = {
        name: ''
    }

    componentDidMount() {
        const currentUser = decodeURIComponent(window.location.search);
        let name = currentUser ? currentUser.slice(1) : localStorage.getItem('name');
        if (name) {
            localStorage.setItem('name', name);
            this.setState({name});
        }
    }

    handleSignout = () => {
        window.localStorage.clear();
        window.location.href = '/';
    }

    render() {
        const {name} = this.state;
        return (
            <footer>
                <div className="gridImages">
                    <Link to="/map" className="box1">
                        <img src="https://i.ya-webdesign.com/images/blue-map-pin-png-4.png" ></img>
                    </Link>

                    <Link to="/landing" className="box2">
                        <img src="https://cdn.pixabay.com/photo/2017/09/28/08/58/camera-2794769_960_720.png"></img>
                    </Link>

                    {/* // {*this is the desired "popup"*} */}
                    <div className="box3">
                        <div className="dropup">
                            <Link className="dropbtn"><img src="https://support.apple.com/library/content/dam/edam/applecare/images/en_US/social/thumbnail/apple-id-account-person-thumbnail-2x.png" style={{ width: "60px", height: "60px", float: "middle" }}></img></Link>
                            <div className="dropup-content">
                                <a href="#" class="prof-img-wrap">{name}<img className="profimg" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Will_Ferrell_as_MegaMind_by_Gage_Skidmore.jpg/220px-Will_Ferrell_as_MegaMind_by_Gage_Skidmore.jpg"></img>
                               </a>
                                <a href="#" className="borderline"><MaterialIcon icon="person" color="red"/>Profile</a>
                                <a href="#"><MaterialIcon icon="attach_money" color="red" />Payment Details</a>
                                <a href="#" className="borderline"><MaterialIcon icon="history" color="red" />Order History</a>
                                <a href="#"><MaterialIcon icon="favorite_border" color="red" />Favorites</a>
                                <a href="#" className="borderline"><MaterialIcon icon="smartphone" color="red" />Contact Us</a>
                                <Link onClick={this.handleSignout} to="#"><MaterialIcon icon="exit_to_app" color="red" />Log Out</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    {/* <Dropdown options={options} onChange={this._onSelect} value={defaultOption} placeholder="Select an option"><a img src="https://support.apple.com/library/content/dam/edam/applecare/images/en_US/social/thumbnail/apple-id-account-person-thumbnail-2x.png" style={{ maxWidth: "3rem", maxHeight: "3rem", float: "middle" }}></a></Dropdown>
        <Dropdown menuClassName='myMenuClassName' /> */}
                </div>
            </footer>
        )
    }
}

export default Footer;
