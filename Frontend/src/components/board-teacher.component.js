import React, { Component } from "react";

// import UserService from "../services/user.service";
// import EventBus from "../common/EventBus";
import Sidebar from "./TeacherSidebar";
import Teacher from "../services/teacher.service";
export default class BoardModerator extends Component {
    constructor(props) {
        super(props);
        Teacher.getAge();
        Teacher.getClass();
        Teacher.getSubject();
        Teacher.availableStudent();
        Teacher.TraCuuHs("10A1");

        this.state = {
            content: "",
        };
    }

    render() {
        return (
            <div className="container ">
                <Sidebar />
                <header className="jumbotron">
                    <h3>Trang giáo viên</h3>
                </header>
            </div>
        );
    }
}
