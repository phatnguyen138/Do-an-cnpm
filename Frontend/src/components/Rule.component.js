import React, { Component } from "react";

import Sidebar from "./Sidebar";

export default class Rule extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="container">
                <Sidebar />
                <header className="jumbotron">
                    <h3>Thay đổi tuổi</h3>
                </header>
            </div>
        );
    }
}
