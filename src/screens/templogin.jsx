import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios';
import Header from "../components/Header/header";
import "./login.css";
​
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
​
    }
​
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
​
    handleSubmit(event) {
        event.preventDefault()
        axios
            .post('/user/login', {
                username: this.state.username,
                password: this.state.password
            })
            .then(response => {
				if (!response.data.error) {
					console.log('successful login');
​
					this.setState({
						redirectTo: '/landing',
					})
				} else {
					console.log("User wasn't logged in!")
					this.setState({
						error: response.data.error
					})
					// alert(this.state.error)
					console.log(this.state.error)
				}
            }).catch(error => {
                console.log('login error: ')
                console.log(error);
​
            })
    }
​
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
                            <div className="col-1 col-ml-auto col-sm-1 col-md-1 col-lg-1 ">
                                <label className="form-label" htmlFor="username"></label>
                            </div>
                            <div className="col-3 col-mr-auto col-sm-3 col-md-3 col-lg-3">
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
                            <div className="col-1 col-ml-auto col-sm-1 col-md-1 col-lg-1">
                                <label className="form-label" htmlFor="password"></label>
                            </div>
                            <div className="col-3 col-mr-auto col-sm-3 col-md-3 col-lg-3">
                                <input required className="form-input"
                                    placeholder="password"
                                    type="password"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>
                        <div className="form-group ">
                            <div className="col-7"></div>
                            <button
                                className="btn btn-primary col-1 col-mr-auto col-sm-1 col-md-1 col-lg-1 "
                                type="submit">Login</button>
                        </div>
                    </form>
                    <br></br>
                    <br></br>
                    <a href={`${process.env.REACT_APP_BACKEND_URL}/user/google`}>
						Sign in with Google
						
					</a>
                    <p className="lead mt-4">
                        No Account? <a href="/signup">Register</a>
                    </p>
                    {this.state.error ?
									<h1> {this.state.error}</h1> :
									<h1></h1>
								}
                </div>
                    </div>
            )
        }
    }
}
​
export default LoginForm