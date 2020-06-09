import React, { Component } from "react";
import Axios from "axios";

class Chat extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            messages: [],
            uri: "",
        };
        this.goRoom = this.goRoom.bind(this);
        this.createRoom = this.createRoom.bind(this);
    }

    async goRoom() {
        await this.setState({ loading: true });
        const base = "http://localhost:8000";
        const formData = new FormData();
        formData.set("username", localStorage.getItem("username"));

        const members = await Axios({
            method: "PATCH",
            url: `${base}/chat/${this.state.uri}/`,
            data: {
                "username": localStorage.getItem("username"),
            },
            headers: {
                //"Content-Type": "multipart/form-data",
                "Authorization": `Token ${localStorage.getItem("token")}`
            },

        });
        localStorage.setItem("uri", this.state.uri);
        await this.setState({
            loading: false,
        });
        this.props.history.push(`/chat/${this.state.uri}/messages`);
    }
    async createRoom() {
        await this.setState({ loading: true });
        const base = "http://localhost:8000";

        const uriinfo = await Axios({
            method: "POST",
            url: `${base}/chat/`,
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`
            },
        });

        localStorage.setItem("uri", uriinfo.data.uri);
        alert(`Your Room Id is ${uriinfo.data.uri}`);
        await this.setState({
            loading: false,
        });
        this.props.history.push(`/chat/${uriinfo.data.uri}/messages/`);
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    render() {
        return (
            <div className="container" >
                <div className="card border-primary" style={{ flex: 2 }} >
                    <h4 className="card-title">Enter a known Room ID </h4>
                    <input
                        type="text"
                        placeholder="id/URI"
                        name="uri"
                        onChange={(e) => this.handleChange(e)}
                    />

                    <button className="btn btn-primary" onClick={this.goRoom}>Open Room</button>
                </div>
                <div className="card border-primary" >
                    <h4>Create Your Own Room </h4>
                    <button className="btn btn-primary" onClick={this.createRoom}>Create Room</button>
                </div>
            </div >
        );
    }
}

export default Chat;
