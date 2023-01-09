import React, { Component } from "react";

// import UserService from "../services/user.service";
// import EventBus from "../common/EventBus";
import Sidebar from "./TeacherSidebar";
import Teacher from "../services/teacher.service";
// const nameClass = {};
export default class BoardModerator extends Component {
    constructor(props) {
        super(props);
        

        this.state = {
            content: "",
        };
        Teacher.getAge();
        Teacher.getClass();
        Teacher.getSubject();
        Teacher.availableStudent();
        this.state.content = JSON.parse(localStorage.getItem("class"))[0].nameClass;
        console.log("nameClass", this.state.content)
        Teacher.TraCuuHs(this.state.content);
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
