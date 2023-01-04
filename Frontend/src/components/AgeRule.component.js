import React, { Component } from "react";
import CheckButton from "react-validation/build/button";
import Sidebar from "./Sidebar";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";

import Admin from "../services/admin.service";
var min, max;
const positive = (value) => {
    if (value <= 0 || value > 100) {
        return (
            <div className="alert alertEdit alert-danger" role="alert">
                Tuổi phải lớn hơn 0
            </div>
        );
    }
};
const getMin = (value) => {
    if (value) {
        min = value;
    }
};
const getMax = (value) => {
    if (value) {
        max = value;
    }
};

const checkVali = () => {
    if (min > max) {
        return (
            <div className="alert alertEdit alert-danger" role="alert">
                Tuổi nhỏ nhất phải nhỏ hơn tuổi lớn nhất
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

const data = JSON.parse(localStorage.getItem("age"));

export default class AgeRule extends Component {
    constructor(props) {
        super(props);
        //

        //
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeMinAge = this.onChangeMinAge.bind(this);
        this.onChangeMaxAge = this.onChangeMaxAge.bind(this);

        this.state = {
            minAge: "",
            maxAge: "",
            successful: false,
            msg: ""
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
            msg: "Cập nhật thành công!" ,
        });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            console.log("send inf age success");
            Admin.ageUpdate(this.state.minAge, this.state.maxAge).then(
                (response) => {
                    // data.minAge = this.state.minAge;
                    // data.maxAge = this.state.maxAge;

                    this.setState({
                        // message: response("Cập nhật thành công"),
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
        data.min = this.state.minAge;
        data.max = this.state.maxAge;
    }

    render() {
        return (
            <div className="container gridNav  ">
                <Sidebar />
                <div>
                    <header className="jumbotron">
                        <h3>Thay đổi tuổi</h3>
                    </header>
                    <h5>Tuổi nhỏ nhất: {data.min} </h5>
                    <h5>Tuổi lớn nhất: {data.max} </h5>

                    <h2>Cập nhật</h2>
                    <h3>{this.state.msg}</h3>

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
                                    validations={[
                                        required,
                                        positive,
                                        getMin,
                                        checkVali,
                                    ]}
                                ></Input>
                                <label>Tuổi lớn nhất: </label>
                                <Input
                                    type="number"
                                    name="maxAge"
                                    value={this.state.maxAge}
                                    onChange={this.onChangeMaxAge}
                                    validations={[required, positive, getMax]}
                                ></Input>
                                <div className="form-group">
                                    <button
                                        className="btn topxn btn-primary btn-block"
                                        validations={[checkVali]}
                                    >
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
