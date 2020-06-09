import React, { Component } from "react";
import Axios from "axios";

class Chatin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            messages: [],
            mymsg: "",
            uri: localStorage.getItem("uri"),
            username: localStorage.getItem("username")
        }
        this.loadmessages = this.loadmessages.bind(this);
        this.sendmessage = this.sendmessage.bind(this);

    }
    async loadmessages() {
        await this.setState({ loading: true })
        const base = "http://localhost:8000";
        const mess = await Axios({
            method: "GET",
            url: `${base}/chat/${this.state.uri}/messages/`,
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`
            }
        });
        await this.setState({
            messages: mess.data.messages,
            loading: false
        })
        this.props.history.push(`/chat/${this.state.uri}/messages/`);
    }
    async sendmessage() {
        console.log('sending message..');
        await this.setState({ loading: true })
        const base = "http://localhost:8000";
        const mess = await Axios({
            method: "POST",
            url: `${base}/chat/${this.state.uri}/messages/`,
            data: {
                message: this.state.mymsg
            },
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`
            }
        }).then(console.log('POstEd'));
        await this.setState({ loading: false });
        //this.props.history.push(`/chat/${this.state.uri}/messages/`);
        this.loadmessages();
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
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };
    render() {
        //console.log('room id was correct');
        const messages = this.state.messages;
        return (
            <div>
                <button className="btn btn-primary" onClick={this.loadmessages}>Refresh</button>
                <h4 className="">Here Come Messages</h4>
                <ol className="list list-group" style={{ flex: 1 }}>
                    {messages.map((m, ind) => this.renderMessage(m, ind))}
                </ol>
                <div className="Input">
                    <input
                        onChange={(e) => this.handleChange(e)}
                        type="text"
                        name="mymsg"
                        placeholder="Enter your message..."

                    />
                    <button onClick={this.sendmessage}>Send</button>

                </div>
            </div>
        );
    }

}

export default Chatin;