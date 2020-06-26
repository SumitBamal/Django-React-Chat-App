import React, { Component } from "react";
import axios from "axios";
import Config from 'Config';
class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            login: true,
            email: "",
            password: "",
            username: "",
        };

        this.initStream = this.initStream.bind(this);
        this.startStream = this.startStream.bind(this);
        this.tologin = this.tologin.bind(this);
        this.tosignup = this.tosignup.bind(this);
    }

    async initStream() {
        await this.setState({
            loading: true,
        });

        const base = Config.serverUrl;

        const formData = new FormData();
        formData.set("email", this.state.email);
        formData.set("username", this.state.username);
        formData.set("password", this.state.password);

        const registration = await axios({
            method: "POST",
            url: `${base}/auth/users/`,
            data: formData,
            config: {
                headers: { "Content-Type": "multipart/form-data" },
            },
        }).catch(function (error) {
            alert('Error ' + error.message);
        });
        const authorization = await axios({
            method: "POST",
            url: `${base}/auth/token/login/`,
            data: formData,
            config: {
                headers: { "Content-Type": "multipart/form-data" },
            },
        }).catch(function (error) {
            alert('Error ' + error.message);
        });

        localStorage.setItem("token", authorization.data.auth_token);
        localStorage.setItem("username", this.state.username);
        await this.setState({
            loading: false,
        });

        this.props.history.push("/");
    }
    async startStream() {
        await this.setState({
            loading: true,
        });

        const base = Config.serverUrl;

        const formData = new FormData();
        //formData.set("email", this.state.email);
        formData.set("username", this.state.username);
        formData.set("password", this.state.password);

        const authorization = await axios({
            method: "POST",
            url: `${base}/auth/token/login/`,
            data: formData,
            config: {
                headers: { "Content-Type": "multipart/form-data" },
            },
        }).catch(function (error) {
            alert('Error ' + error.message);
        });

        localStorage.setItem("token", authorization.data.auth_token);
        localStorage.setItem("username", this.state.username);
        await this.setState({
            loading: false,
        });

        this.props.history.push("/");
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };
    tosignup() {
        this.setState({ login: false });
    };
    tologin() {
        this.setState({ login: true });
    };
    render() {
        return (
            <div className="container">
                <div className="nav nav-tabs" style={{ display: 'flex', justifyContent: 'center' }}>
                    <button className={"btn btn-primary"} onClick={this.tologin}>Login</button>
                    <button className={"btn btn-primary"} onClick={this.tosignup}>SignUp</button>
                </div>
                <div className="" style={{ display: 'flex', justifyContent: 'center' }}>
                    {this.state.login &&
                        <div className='modal-content col-sm-2 col-form-label'>
                            <h4>Login</h4>
                            <label>UserName</label>
                            <input
                                type="text"
                                placeholder="Username"
                                name="username"
                                onChange={(e) => this.handleChange(e)}
                            />
                            <label>Password</label>
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                onChange={(e) => this.handleChange(e)}
                            />
                            <div className="modal-footer">
                                <button className="btn btn-primary" onClick={this.startStream}>Login</button>
                            </div>
                        </div>}
                    {!this.state.login &&
                        <div className="modal-content col-sm-2 col-form-label">
                            <h4>SignUp</h4>
                            <label>Email</label>
                            <input
                                type="email"
                                placeholder="Email"
                                name="email"
                                onChange={(e) => this.handleChange(e)}
                            />
                            <label>UserName</label>
                            <input
                                type="text"
                                placeholder="Username"
                                name="username"
                                onChange={(e) => this.handleChange(e)}
                            />
                            <label>Password</label>
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                onChange={(e) => this.handleChange(e)}
                            />
                            <div className="modal-footer">
                                <button className="btn btn-primary" onClick={this.initStream}>SignUp</button>
                            </div>
                        </div>}
                </div>
            </div>
        );
    }
}

export default Login;
