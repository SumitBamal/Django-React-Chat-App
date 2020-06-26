import React, { Component } from "react";
import Axios from "axios";
import ReactLoading from "react-loading";
import Config from 'Config';
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
        const base = Config.serverUrl;
        const mess = await Axios({
            method: "GET",
            url: `${base}/chat/${this.state.uri}/messages/`,
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`
            }
        }).catch(function (error) {
            alert('Error ' + error.message);
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
        const base = Config.serverUrl;
        const mess = await Axios({
            method: "POST",
            url: `${base}/chat/${this.state.uri}/messages/`,
            data: {
                message: this.state.mymsg
            },
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`
            }
        }).catch(function (error) {
            alert('Error ' + error.message);
        });
        await this.setState({ loading: false });
        //this.props.history.push(`/chat/${this.state.uri}/messages/`);
        this.loadmessages();
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
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    componentDidMount() {
        this.loadmessages();
    }
    render() {
        //console.log('room id was correct');
        const messages = this.state.messages;
        return (
            <div>
                {this.state.loading &&
                    <ReactLoading type={"bars"} color={"red"} />
                }
                <button className="btn btn-primary" onClick={this.loadmessages}>Refresh</button>
                <h4 className="">ChatRoom</h4>
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
                        <button className="btn btn-primary" onClick={this.sendmessage}>Send</button>
                    </div>
                </div>
            </div>
        );
    }

}

export default Chatin;