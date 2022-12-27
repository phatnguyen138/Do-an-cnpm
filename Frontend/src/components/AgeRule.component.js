import React, { Component } from "react";
import CheckButton from "react-validation/build/button";
import Sidebar from "./Sidebar";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";

import Admin from "../services/admin.service";

const positive = (value) => {
    if (value <= 0 || value > 40) {
        return (
            <div className="alert alertEdit alert-danger" role="alert">
                Tuổi phải lớn hơn 0
            </div>
        );
    }
};
const required = (value) => {
    if (!value) {
        return (
            <div className="alert alertEdit alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

export default class AgeRule extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeMinAge = this.onChangeMinAge.bind(this);
        this.onChangeMaxAge = this.onChangeMaxAge.bind(this);

        this.state = {
            minAge: "",
            maxAge: "",
            successful: false,
        };
    }
    onChangeMinAge(e) {
        this.setState({
            minAge: e.target.value,
        });
    }
    onChangeMaxAge(e) {
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
            console.log("send inf age success");
            Admin.ageUpdate(this.state.minAge, this.state.maxAge).then(
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
                    <header className="jumbotron">
                        <h3>Thay đổi tuổi</h3>
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
                                    Tuổi nhỏ nhất:{" "}
                                </label>
                                <Input
                                    type="number"
                                    name="minAge"
                                    value={this.state.minAge}
                                    onChange={this.onChangeMinAge}
                                    validations={[required, positive]}
                                ></Input>
                                <label>Tuổi lớn nhất: </label>
                                <Input
                                    type="number"
                                    name="maxAge"
                                    value={this.state.maxAge}
                                    onChange={this.onChangeMaxAge}
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
