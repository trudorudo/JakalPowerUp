import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import axios from 'axios'
import Header from "../components/Header/header";

class Signup extends Component {
	constructor() {
		super()
		this.state = {
			name: '',
			username: '',
			password: '',
			password2: '',
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
		//request to server to add a new username/password
		axios.post('/user', {
			name: this.state.name,
			username: this.state.username,
			password: this.state.password,
			password2: this.state.password2
		})
			.then(response => {
				// console.log(response)
				if (!response.data.error) {
                    const {name} = response.data;
                    localStorage.setItem('name', name);
					this.setState({
						redirectTo: '/landing',
                    })
				} else {
					this.setState({
						error: response.data.error
					})
				}
			}).catch(error => {
			})
	}


	render() {
		if (this.state.redirectTo) {
			return <Redirect to={{ pathname: this.state.redirectTo }} />
		} else {
			return (
				<div className="scancontainer">
					<Header />
					

					<div className="SignupForm" style={{marginTop:"100px"}}>
						<h4 style={{fontSize:"2rem"}}>Sign up</h4>
						<form onSubmit={this.handleSubmit} className="form-horizontal">
							<div className="form-group">
								<div className="col-1 col-ml-auto">
									<label className="form-label" htmlFor="username"></label>
								</div>
								<div className="col-3 col-mr-auto">
									<input required className="form-input"
										type="text"
										id="name"
										name="name"
										placeholder="Name"
										value={this.state.name}
										onChange={this.handleChange}
									/>
								</div>
							</div>
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
							<div className="form-group">
								<div className="col-1 col-ml-auto">
									<label className="form-label" htmlFor="password2"></label>
								</div>
								<div className="col-3 col-mr-auto">
									<input required className="form-input"
										placeholder="Confirm Password"
										type="password"
										name="password2"
										value={this.state.password2}
										onChange={this.handleChange}
									/>
								</div>
							</div>
							<div className="form-group ">
								<div className="col-7"></div>
								<button
									className="signupBtn"
									type="submit"

								>Sign up</button>
							</div>
							<p className="lead mt-4">Have An Account? <Link to="/">Login</Link></p>
							<div>
								{this.state.error ?
									<h1> {this.state.error}</h1> :
									<h1></h1>
								}
							</div>
						</form>
					</div>
				</div>
			)
		}
	}
}
export default Signup