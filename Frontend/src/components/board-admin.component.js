import React, { Component } from "react";

// import UserService from "../services/user.service";
// import EventBus from "../common/EventBus";
import Sidebar from "./Sidebar";
import Admin from "../services/admin.service";
export default class BoardAdmin extends Component {
    constructor(props) {
        super(props);
        Admin.getAge();
        Admin.getClass();
        Admin.getSubject();

        this.state = {
            content: "",
        };
    }

    render() {
        return (
            <div className="container gridNav">
                <Sidebar />
                <header className="jumbotron">
                    <h3>Thay đổi quy định</h3>
                </header>
            </div>
        );
    }
}
