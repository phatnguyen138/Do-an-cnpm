import React, { Component } from "react";

import userService from "../services/user.service";
import StudentSideBar from "./StudentSideBar";

export default class BoardUser extends Component {
  constructor(props) {
    super(props);
    userService.getClass();
    userService.getSubject();

    this.state = {
      content: ""
    };
  }

  render() {
    return (
        <div className="container gridNav">
            <StudentSideBar />
            <header className="jumbotron">
                <h3>Thay đổi quy định</h3>
            </header>
        </div>
    );
}
}
