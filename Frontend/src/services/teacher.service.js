import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/teacher/";
const header = authHeader();

class Teacher {
    getAge() {
        console.log("Get data start");
        return axios
            .post(API_URL + "get-age", { headers: header })
            .then(function (response) {
                const data = JSON.stringify(response.data);
                localStorage.setItem("age", data);
            },{ headers: authHeader() });
    }
    getClass() {
        console.log("Get class start");
        return axios
            .post(API_URL + "get-class", { headers: header })
            .then(function (response) {
                const classData = JSON.stringify(response.data);
                localStorage.setItem("class", classData);
            },{ headers: authHeader() });
    }
    getSubject() {
        console.log("Get subject start");
        return axios
            .post(API_URL + "get-subject", { headers: header })
            .then(function (response) {
                const subject = JSON.stringify(response.data);
                localStorage.setItem("subject", subject);
            },{ headers: authHeader() });
    }

    availableStudent()
    {
        console.log("Get available student start");
        return axios
            .post(API_URL + "get-student", { headers: header })
            .then(function (response) {
                const student = JSON.stringify(response.data);
                localStorage.setItem("student", student);
            },{ headers: authHeader() });

    }
    LapDanhSach(idList,className)
    {
        console.log("Lap danh sach")
        return axios.post(
            API_URL + "lap-danh-sach",
            {
                idList,
                className
            },
            { headers: authHeader() },
        );
    }
    TiepNhanHS(name,gender,birthDay,address,email)
    {
        console.log("TiepNhanHS")
        return axios.post(
            API_URL + "tiep-nhan",
            {
                name,gender,birthDay,address,email
            },
            { headers: authHeader() },
        );
    }



}

export default new Teacher();
