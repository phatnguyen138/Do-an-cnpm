import React, { Component } from "react";
import CheckButton from "react-validation/build/button";
import Sidebar from "./Sidebar";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";

import Admin from "../services/admin.service";
import ClassSidebar from "./ClassSidebar"

const positive = (value) => {
    if (value <= 0) {
        return (
            <div className="alert alertEdit alert-danger" role="alert">
                Tuổi phải lớn hơn 0!
            </div>
        );
    }
};
const required = (value) => {
    if (!value) {
        return (
            <div className="alert alertEdit alert-danger" role="alert">
                Bắt buộc!
            </div>
        );
    }
};

export default class ClassRule extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeClass1 = this.onChangeClass1.bind(this);
        this.onChangeMaxAtten = this.onChangeAtten.bind(this);

        this.state = {
            class1: "",
            maxAtten: "",
            successful: false,
        };
    }
    onChangeClass1(e) {
        this.setState({
            class1: e.target.value,
        });
    }
    onChangeAtten(e) {
        this.setState({
            maxAtten: e.target.value,
        });
    }
    handleSubmit(e) {
        e.preventDefault();

        this.setState({
            message: "",
            successful: false,
        });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            console.log("send inf class success");
            Admin.classAdd(this.state.class1, this.state.maxAtten).then(
                (response) => {
                    this.setState({
                        message: response.data.message,
                        successful: true,
                    });
                },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    this.setState({
                        successful: false,
                        message: resMessage,
                    });
                },
            );
        }
    }

    render() {
        return (
            <div className="container gridNav  ">
                <Sidebar /> 
                <div>
                <ClassSidebar/>
                    
                    <header className="jumbotron">
                        <h3>Thêm lớp học</h3>
                    </header>
                    

                    <Form
                        onSubmit={this.handleSubmit}
                        ref={(c) => {
                            this.form = c;
                        }}
                    >
                        {!this.state.successful && (
                            <div>
                                <label
                                    className="form-label form-check-label"
                                    htmlFor="class"
                                >
                                    Tên lớp:{" "}
                                </label>
                                <Input
                                    type="text"
                                    name="className"
                                    value={this.state.class1}
                                    onChange={this.onChangeClass1}
                                    validations={[required]}
                                ></Input>
                                <label htmlFor="">Số lượng học sinh: </label>
                                <Input
                                    type="number"
                                    name="attend"
                                    value={this.state.maxAtten}
                                    onChange={this.onChangeAtten}
                                    validations={[required, positive]}
                                ></Input>
                                <div className="form-group">
                                    <button className="btn topxn btn-primary btn-block">
                                        Xác nhận
                                    </button>
                                </div>
                            </div>
                        )}

                        {this.state.message && (
                            <div className="form-group">
                                <div
                                    className={
                                        this.state.successful
                                            ? "alert alert-success"
                                            : "alert alert-danger"
                                    }
                                    role="alert"
                                >
                                    {this.state.message}
                                </div>
                            </div>
                        )}

                        <CheckButton
                            style={{ display: "none" }}
                            ref={(c) => {
                                this.checkBtn = c;
                            }}
                        />
                    </Form>
                </div>
            </div>
        );
    }
}
