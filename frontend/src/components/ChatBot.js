import React, { Component } from "react";
import Axios from "axios";

class ChatBot extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [{ "user": { "username": "Ani't No Bot" }, "message": "Hi, i am your dumb Bot!" }],
            mymsg: '',
            loading: false,
            username: localStorage.getItem("username")
        }
        this.botmsg = this.botmsg.bind(this);
    }
    renderMessage(msg, ind) {
        const { user, message } = msg;
        const currentMember = this.state.username;
        const messageFromMe = user.username === currentMember;
        const className = messageFromMe ?
            "alert alert-secondary text-right" : "alert alert-secondary";
        const classnameusr = messageFromMe ?
            "badge badge-info" : "badge badge-danger"
        return (
            <li key={ind} className={className}>
                <div className="Message-content" style={{ flex: 5 }}>
                    <div className={classnameusr}>
                        {user.username}
                    </div>
                    <div className="text">{message}</div>
                </div>
            </li>
        );
    }
    //This method sends and recieves the msgs from bot 
    async botmsg() {
        //add to messages
        await this.setState({ loading: true })
        this.state.messages.push({ "user": { "username": this.state.username }, "message": this.state.mymsg });
        const base = "http://localhost:8000";
        const resp = await Axios({
            method: "POST",
            url: `${base}/chatbot/`,
            data: {
                "message": this.state.mymsg
            },
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`
            }
        });
        this.state.messages.push(resp.data);
        await this.setState({ loading: false })
    }
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };
    render() {
        console.log('with the bot');
        var messages = this.state.messages;
        return (
            <div className="container">
                <h3>ChatBot</h3>
                <ol className="list list-group" style={{ flex: 1 }}>
                    {messages.map((m, ind) => this.renderMessage(m, ind))}
                </ol>
                <div className="input">
                    <input
                        onChange={(e) => this.handleChange(e)}
                        type="text"
                        name="mymsg"
                        placeholder="Enter your message..."

                    />
                    <button className="btn btn-primary" onClick={this.botmsg}>Send</button>
                </div>
            </div>
        )
    }
}
export default ChatBot;