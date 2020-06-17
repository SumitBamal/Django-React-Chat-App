import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { render } from "react-dom";
import Chat from "./chat";
import Chatin from "./chatin";
import Login from "./login";
import GoLogin from "./GoLogin";
import Gochat from "./Gochat";
import Gochatin from "./Gochatin";
import ChatBot from "./ChatBot";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loaded: false,
      placeholder: "Loading",
    };
  }
  componentDidMount() {
    fetch("/auth/")
      .then((response) => {
        if (response.status > 400) {
          return this.setState(() => {
            return { placeholder: "Something went wrong!" };
          });
        }
        return response.json();
      })
      .then((data) => {
        this.setState(() => {
          return {
            data,
            loaded: true,
          };
        });
      });
  }
  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("uri");
    this.props.history.push('/auth/login/');
  }
  render() {
    return (
      <div className="">
        <nav className="navbar bg-primary">
          <h2 >Shitty Chat App</h2>
          {Boolean(localStorage.getItem("token")) &&
            <button className="btn btn-secondary my-2 my-sm-0" onClick={this.logout}>Logout</button>
          }
        </nav>
        <div id="container" style={{ height: "100vh" }}>
          <Router>
            <Switch>
              <GoLogin path="/auth/login/" component={Login} />
              <Gochatin path="/chat/:uri/messages/" component={Chatin} />
              <Gochat path="/chatbot/" component={ChatBot} />
              <Gochat path="/" component={Chat} />

            </Switch>
          </Router>

        </div>
        {/* <div className="fixed-bottom card border-success">
          <a className="text-right" target="_blank" href="https://github.com/SumitBamal/Django-React-Chat-App">Github</a>
        </div> */}
      </div>
    );
  }
}

export default App;

const container = document.getElementById("app");
render(<App />, container);
