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
            class: "",
            getSubject: ""
        };
        // localStorage.removeItem("class")
        if (JSON.parse(localStorage.getItem("user"))) 
        {
        console.log ("True")
        Teacher.getAge();
        Teacher.getClass();
        Teacher.getSubject();
        Teacher.availableStudent();
        this.state.class = JSON.parse(localStorage.getItem("class"))[0].nameClass;
        this.state.getSubject = JSON.parse(localStorage.getItem("subject"))[0].name;
        console.log("nameClass", this.state.class)
        Teacher.TraCuuHs(this.state.class);
        Teacher.CapNhatDiem(this.state.class,this.state.getSubject,true);
        } else console.log ("Fasle")
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
