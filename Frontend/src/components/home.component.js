import React, { Component } from "react";

import UserService from "../services/user.service";
import background from "../pictures/Home1.jpg";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    return (
      <div className="container login_bg ">
        
        <header className="jumbotron">
          <h3>Trang chủ</h3>
        </header>
        <img
                    src={background}
                    alt="background"
                    className="background home1 "
                ></img>
      </div>
    );
  }
}
