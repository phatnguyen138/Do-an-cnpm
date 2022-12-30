import React, { Component } from "react";

import UserService from "../services/user.service";
// import EventBus from "../common/EventBus";
import Sidebar from "./Sidebar";

export default class BoardAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }


  render() {
    return (
      <div className="container gridNav">
        <Sidebar/>
        <header className="jumbotron">
          <h3>Thay đổi quy định</h3>
        </header>
      </div>
    );
  }
}
