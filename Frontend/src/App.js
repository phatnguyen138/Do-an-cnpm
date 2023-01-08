import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import authHeader from "./services/auth-header";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";

import BoardUser from "./components/board-student.component";
import BoardModerator from "./components/board-teacher.component";
import BoardAdmin from "./components/board-admin.component";
import AgeRule from "./components/AgeRule.component";
import SubjectUpdate from "./components/SubjectUpdate.component";
import StudentSearch from "./components/StudentSearch.Component"

import AuthService from "./services/auth.service";
// import Profile from "./components/profile.component";
import Logo from "./pictures/logout.png";

// import AuthVerify from "./common/auth-verify";
import EventBus from "./common/EventBus";

//Side bar
import { ProSidebarProvider } from "react-pro-sidebar";
import ClassUpdate from "./components/ClassUpdate.component";

// console.log("user:", user);
class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModeratorBoard: false,
            showAdminBoard: false,
            currentUser: undefined,
        };
    }
    componentDidMount() {
        const data = authHeader();
        const user = data;
        if (user != null) {
            this.setState({
                currentUser: user,
                showAdminBoard: user.role.includes("admin"),
                showTeacherBoard: user.role.includes("teacher"),
            });
        }

        EventBus.on("logout", () => {
            this.logOut();
        });
    }
    logOut() {
        AuthService.logout();
        this.setState({
            showModeratorBoard: false,
            showAdminBoard: false,
            currentUser: undefined,
        });
    }
    componentWillUnmount() {
        EventBus.remove("logout");
    }

    render() {
        const { currentUser, showAdminBoard, showTeacherBoard } = this.state;
        return (
            <ProSidebarProvider>
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css?family=Sofia&effect=neon|outline|emboss|shadow-multiple"
                />

                <div className="fontedit">
                    <nav className="cardnav navbar navbar-expand-lg navbar-light font1  ">
                        <Link to={"/"} className="fontedit font1">
                            HCMUS
                        </Link>
                        <div className="navbar-nav mr-auto">
                            <li className="">
                                <Link to={"/home"} className="nav-link font1">
                                    Home
                                </Link>
                            </li>
                            {showAdminBoard && (
                                <li className="nav-item">
                                    <Link
                                        to={"/admin/"}
                                        className="nav-link font"
                                    >
                                        Admin
                                    </Link>
                                </li>
                            )}
                            {showTeacherBoard && (
                                <li className="nav-item">
                                    <Link
                                        to={"/teacher/"}
                                        className="nav-link font"
                                    >
                                        Teacher
                                    </Link>
                                </li>
                            )}
                        </div>

                        {currentUser ? (
                            <div className="navbar-nav ml-auto">
                                {/* <li className="nav-item">
                                    <Link to={"/profile"} className="nav-link">
                                        {currentUser.username}
                                    </Link>
                                </li> */}
                                <li className="nav-item">
                                    <a
                                        href="/auth/login"
                                        className="nav-link"
                                        onClick={this.logOut}
                                    >
                                        <img
                                            className="Logo"
                                            src={Logo}
                                            alt="Log out"
                                        ></img>
                                    </a>
                                </li>
                            </div>
                        ) : (
                            <div className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link
                                        to={"auth/login"}
                                        className="nav-link"
                                    >
                                        Login
                                    </Link>
                                </li>

                                {/* <li className="nav-item">
                                <Link to={"auth/register"} className="nav-link">
                                    Sign Up
                                </Link>
                            </li> */}
                            </div>
                        )}
                    </nav>

                    <div className="container mt-3 ">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/home" element={<Home />} />
                            <Route path="/auth/login" element={<Login />} />
                            <Route
                                path="/admin/dang-ky"
                                element={<Register />}
                            />
                            {/* <Route path="/profile" element={<Profile />} /> */}
                            <Route path="/user/" element={<BoardUser />} />
                            <Route path="/mod/" element={<BoardModerator />} />
                            <Route path="/admin/" element={<BoardAdmin />} />
                            <Route
                                path="/admin/quy-dinh-tuoi"
                                element={<AgeRule />}
                            />
                            <Route
                                path="/admin/them-lop"
                                element={<ClassUpdate />}
                            />
                            <Route
                                path="/admin/cap-nhat-lop"
                                element={<ClassUpdate />}
                            />

                            <Route
                                path="/admin/cap-nhat-mon"
                                element={<SubjectUpdate />}
                            />
                            {/* <Route
                                path="/user/tra-cuu"
                                element={<StudentSearch />}
                            /> */}
                        </Routes>
                    </div>
                </div>
            </ProSidebarProvider>
        );
    }
}

export default App;
