import React from "react";
import Footer from "../components/Sticky Footer/stickyfooter";
import socketIo from 'socket.io-client';
import Checkout from '../components/Checkout/checkout';
import Header from "../components/Header/header";
import { toast } from "react-toastify";
import "./pagecss.css";

class SecondPage extends React.Component {
    componentDidMount() {
        if (!localStorage.getItem('name')) {
            return this.props.history.push('/');
        }

        this.socket = socketIo.connect();
        this.socket.on('newData', data => {
            alert(JSON.stringify(data));
        });
    }

    sendDataToApi = () => {
        fetch('/api/send-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId: 1 })
        }).then(res => res.json())
            .then(res => {
                console.log('request sent', res);
                toast.error('Thank You For Your Rental!');
                this.props.history.push("/rental");
            }).catch(err => console.log('err sending request', err));
    }

    render() {
        return (
            <div className="scancontainer">
                <Header />
                <div className="footerSpace margin">
                    <Checkout sendDataToApi={this.sendDataToApi} />
                </div>
                <Footer />
            </div>
        )
    }
}
export default SecondPage;