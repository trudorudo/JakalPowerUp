import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import axios from 'axios';
import Header from "../components/Header/header";
import ggImg from "../images/googleimage.png";
import "./login.css";

class LoginForm extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            redirectTo: null,
            error: null
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)

    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        axios
            .post('/user/login', {
                username: this.state.username,
                password: this.state.password
            })
            .then(response => {
                if (!response.data.error) {
                    const { name } = response.data;
                    localStorage.setItem('name', name);
                    this.setState({
                        redirectTo: '/landing',
                    })
                } else {
                    this.setState({
                        error: response.data.error
                    });
                }
            }).catch(error => {
                console.log('login error: ')
                console.log(error);

            })
    }

    render() {
        if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        } else {
            return (
                <div className="scancontainer">
                    <Header />

                    <div className="login">
                        <h4>Login</h4>
                        <form className="form-horizontal" onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <div className="col-1 col-ml-auto">
                                    <label className="form-label" htmlFor="username"></label>
                                </div>
                                <div className="col-3 col-mr-auto">
                                    <input required className="form-input"
                                        type="text"
                                        id="username"
                                        name="username"
                                        placeholder="Username"
                                        value={this.state.username}
                                        onChange={this.handleChange}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-1 col-ml-auto">
                                    <label className="form-label" htmlFor="password"></label>
                                </div>
                                <div className="col-3 col-mr-auto">
                                    <input required className="form-input"
                                        placeholder="Password"
                                        type="password"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.handleChange}
                                    />
                                </div>
                            </div>
                            <div className="btnWrapper">
                                <div>
                                <button
                                    className="loginBtn"
                                    type="submit">Login
                            </button>
                                </div>
                                <div>
                                <a href={`${process.env.REACT_APP_BACKEND_URL}/user/google`}>
                                    <img className="google-img" src={ggImg} alt="login with google" />
                                </a>
                                </div>
                            </div>
                        </form>
                        <p className="lead mt-4">
                            No Account? <Link to="/signup">Register</Link>
                        </p>
                        {this.state.error ?
                            <h1> {this.state.error}</h1> :
                            ''
                        }
                    </div>
                </div>
            )
        }
    }
}

export default LoginForm