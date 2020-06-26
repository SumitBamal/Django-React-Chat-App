import React, { Component } from "react";
import Axios from "axios";
import ReactLoading from "react-loading";
import Config from 'Config';
class ChatBot extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [{ "user": { "username": "ani't no BOT" }, "message": "Hi, i am your dumb Bot!" }],
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
            "table-active text-right" : "table-active";
        const classnameusr = messageFromMe ?
            "badge badge-info" : "badge badge-danger"
        return (
            <tr key={ind} className={className}>
                <div className="Message-content" style={{ flex: 5 }}>
                    <span className={classnameusr}>
                        {user.username}
                    </span>
                    <div className="">{message}</div>
                </div>
            </tr>
        );
    }
    //This method sends and recieves the msgs from bot 
    async botmsg() {
        //add to messages
        await this.setState({ loading: true })
        this.state.messages.push({ "user": { "username": this.state.username }, "message": this.state.mymsg });
        const base = Config.serverUrl;
        const resp = await Axios({
            method: "POST",
            url: `${base}/chatbot/`,
            data: {
                "message": this.state.mymsg
            },
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`
            }
        }).catch(function (error) {
            alert('Error ' + error.message);
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
                <table className="table table-hover">
                    <h3>ChatBot</h3>
                    {this.state.loading &&
                        <ReactLoading type={"bars"} color={"red"} />
                    }
                    <tbody className="list list-group" style={{ flex: 1 }}>
                        {messages.map((m, ind) => this.renderMessage(m, ind))}
                    </tbody>
                    <div className="modal-footer">
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
                </table>
            </div>
        )
    }
}
export default ChatBot;