import React from "react";
import Timer from 'react-compound-timer';
import Footer from "../components/Sticky Footer/stickyfooter";
import Header from "../components/Header/header";
import "./pagecss.css";


class ThirdPage extends React.Component {
    state = {
        balance: 0
    }

    componentDidMount() {
        if (!localStorage.getItem('name')) {
            return this.props.history.push('/');
        }
        setInterval(() => this.setState(prevState => ({ balance: prevState.balance + 0.0003 })), 1000);
    }

    render() {
        const { balance } = this.state;

        return (
            <div className="scancontainer">
                {/* <Header /> */}
                <Footer />
                <div className="container2">
                    <div className="infoBox">
                        <h1 className="boxTitle"> Your Rental </h1>
                        <h2 className="boxTitle">Time Elapsed</h2>
                        <div className="timer scancontainer">
                            <Timer>
                                <div className="hours time"><Timer.Hours /> h </div>
                                <div className="minutes time"><Timer.Minutes /> m </div>
                                <div className="seconds time"><Timer.Seconds /> s </div>
                            </Timer>
                        </div>
                        <br></br>
                        <div className="tab">
                            <h2> Current Balance </h2>
                            <div className="tabExpense">
                                <h2>${balance.toFixed(3)}</h2>
                            </div>
                        </div>
                    </div>
                    {/* <Footer /> */}
                </div>
            </div>
        )
    }
}







export default ThirdPage;