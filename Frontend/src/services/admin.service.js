import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/admin/";
const header = authHeader();

class Admin {
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

    ageUpdate(minAge, maxAge) {
        return axios.post(
            API_URL + "quy-dinh-tuoi1",
            {
                minAge,
                maxAge,
            },
            { headers: authHeader() },
        );
    }
    classUpdate(id,nameClass, maxAttend) {
        console.log("Cập nhật lớp thành công ");
        return axios.post(
            API_URL + "cap-nhat-lop",
            {
                id,
                nameClass,
                maxAttend,
            },
            { headers: authHeader() },
        );
    }
    classDelete(id) {
        return axios.post(API_URL + "xoa-lop", {
            id,
        },{ headers: authHeader() });
    }
    classAdd(nameClass, attend) {
        console.log("Thêm lớp thành công! ");
        return axios.post(
            API_URL + "them-lop",
            {
                nameClass,
                attend,
            },
            { headers: authHeader() },
        );
    }

    SubjectUpdate(id, newName, mark) {
        return axios.post(API_URL + "cap-nhat-mon", {
            id,
            newName,
            mark,
        },{ headers: authHeader() });
    }
    SubjectDelete(id) {
        return axios.post(API_URL + "xoa-mon", {
            id,
        },{ headers: authHeader() });
    }
    SubjectAdd(name, mark) {
        console.log("name:", name)
        return axios.post(API_URL + "them-mon", {
            name,
            mark,
        },{ headers: authHeader() });
    }
    register(username, email, password, role) {
        return axios.post(API_URL + "dang-ky", {
            username,
            password,
            email,
            role,
        },{ headers: authHeader() });
    }
}

export default new Admin();
