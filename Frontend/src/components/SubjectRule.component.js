import React, { Component } from "react";
import CheckButton from "react-validation/build/button";
import Sidebar from "./Sidebar";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";

import Admin from "../services/admin.service";
import Subject from "./Subject"

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
        this.onChangeMinAge = this.onChangeClass.bind(this);
        this.onChangeMaxAge = this.onChangeAtten.bind(this);

        this.state = {
            class: "",
            maxAtten: "",
            successful: false,
        };
    }
    onChangeClass(e) {
        this.setState({
            minAge: e.target.value,
        });
    }
    onChangeAtten(e) {
        this.setState({
            maxAge: e.target.value,
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
            Admin.ageUpdate(this.state.class, this.state.maxAtten).then(
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
                <Subject/>
                    
                    <header className="jumbotron">
                        <h3>Thêm môn học</h3>
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
                                    htmlFor="age"
                                >
                                    Tên môn học:{" "}
                                </label>
                                <Input
                                    type="text"
                                    name="minAge"
                                    value={this.state.class}
                                    onChange={this.onChangeClass}
                                    validations={[required]}
                                ></Input>
                                <label for="">Điểm chuẩn qua môn: </label>
                                <Input
                                    type="number"
                                    name="maxAge"
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
