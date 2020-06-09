import React, { Component } from "react";
import axios from "axios";

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            //email: "",
            password: "",
            username: "",
        };

        this.initStream = this.initStream.bind(this);
        this.startStream = this.startStream.bind(this);
    }

    async initStream() {
        await this.setState({
            loading: true,
        });

        const base = "http://localhost:8000";

        const formData = new FormData();
        //formData.set("email", this.state.email);
        formData.set("username", this.state.username);
        formData.set("password", this.state.password);

        const registration = await axios({
            method: "POST",
            url: `${base}/auth/users/`,
            data: formData,
            config: {
                headers: { "Content-Type": "multipart/form-data" },
            },
        });
        const authorization = await axios({
            method: "POST",
            url: `${base}/auth/token/login/`,
            data: formData,
            config: {
                headers: { "Content-Type": "multipart/form-data" },
            },
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

        const base = "http://localhost:8000";

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

    render() {
        return (
            <div className="form-group row">
                <div className="col-sm-2 col-form-label">
                    <h4>Login</h4>
                    {/* <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => this.handleChange(e)}
          /> */}
                    <input
                        type="text"
                        placeholder="Username"
                        name="username"
                        onChange={(e) => this.handleChange(e)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={(e) => this.handleChange(e)}
                    />
                    <button onClick={this.initStream}>SignUp</button>
                    <button onClick={this.startStream}>Login</button>
                </div>
            </div>
        );
    }
}

export default Login;
