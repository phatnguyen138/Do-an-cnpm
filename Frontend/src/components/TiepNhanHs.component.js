import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { Radio } from "antd";
import Sidebar from "./TeacherSidebar";
// import Teacher from "../services/teacher.service";
import { isEmail } from "validator";

import AuthService from "../services/auth.service";
import Teacher from "../services/teacher.service";
const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" gender="alert">
                This field is required!
            </div>
        );
    }
};

const email = (value) => {
    if (!isEmail(value)) {
        return (
            <div className="alert alert-danger" gender="alert">
                This is not a valid email.
            </div>
        );
    }
};

const vfullname = (value) => {
    if (value.length < 3 || value.length > 20) {
        return (
            <div className="alert alert-danger" gender="alert">
                The fullname must be between 3 and 20 characters.
            </div>
        );
    }
};

const vbirthday = (value) => {
    if (value.length < 6 || value.length > 40) {
        return (
            <div className="alert alert-danger" gender="alert">
                The birthday must be between 6 and 40 characters.
            </div>
        );
    }
};

export default class TiepNhanHs extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangefullname = this.onChangefullname.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeBirthday = this.onChangeBirthday.bind(this);
        this.onChangeGender = this.onChangeGender.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);

        this.state = {
            fullname: "",
            gender: "",
            birthday: "",
            address: "",
            email: "",
            successful: false,
            message: "",
        };
    }
    onChangeGender(e) {
        this.setState({
            gender: e.target.value,
        });
    }

    onChangefullname(e) {
        this.setState({
            fullname: e.target.value,
        });
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value,
        });
    }
    onChangeAddress(e) {
        this.setState({
            address: e.target.value,
        });
    }

    onChangeBirthday(e) {
        this.setState({
            birthday: e.target.value,
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({
            message: "Thêm học sinh thành công",
            successful: false,
        });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            console.log("Tiep nhan hoc sinh thanh cong");
            Teacher.TiepNhanHS(
                this.state.fullname,
                this.state.gender,
                this.state.birthday,
                this.state.address,
                this.state.email
            ).then(
                (response) => {
                    this.setState({
                        
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
            <div>
                <header className="jumbotron">
                    <h3>Tiếp nhận học sinh</h3>
                </header>

                <div className="grid">
                    <Sidebar />
                    <div className="card  edited">
                        {/* <img
                        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                        alt="profile-img"
                        className="profile-img-card"
                    /> */}

                        <Form
                            onSubmit={this.handleSubmit}
                            ref={(c) => {
                                this.form = c;
                            }}
                        >
                            {!this.state.successful && (
                                <div>
                                    <div className="form-group">
                                        <label htmlFor="fullname">
                                            Họ và tên:
                                        </label>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            name="fullname"
                                            value={this.state.fullname}
                                            onChange={this.onChangefullname}
                                            validations={[required, vfullname]}
                                        />
                                    </div>
                                    <div className="grid">
                                    <div>
                                        <label htmlFor="fullname">
                                            Giới tính:
                                        </label>
                                        {/* gender */}
                                        <Radio.Group
                                            className="Radio"
                                            onChange={this.onChangeGender}
                                            value={this.state.gender}
                                        >
                                            <Radio
                                                className="Radio"
                                                value="Male"
                                            >
                                                Nam
                                            </Radio>
                                            
                                            <Radio
                                                className="Radio"
                                                value="Female"
                                            >
                                                Nữ
                                            </Radio>
                                            
                                        </Radio.Group>
                                        {/* gender */}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="birthday">
                                            Ngày sinh:
                                        </label>
                                        <Input
                                            type="date"
                                            className="form-control"
                                            name="birthday"
                                            value={this.state.birthday}
                                            onChange={this.onChangebirthday}
                                            validations={[required, vbirthday]}
                                        />
                                    </div>
                                    
                                        
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Địa chỉ: </label>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            name="address"
                                            value={this.state.address}
                                            onChange={this.onChangeAddress}
                                            validations={[required]}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email: </label>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            name="email"
                                            value={this.state.email}
                                            onChange={this.onChangeEmail}
                                            validations={[required, email]}
                                        />
                                    </div>
                                    

                                    <div className="form-group">
                                        <button className="btn btn-primary btn-block">
                                            Thêm học sinh mới
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
                                        gender="alert"
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

            </div>
        );
    }
}
