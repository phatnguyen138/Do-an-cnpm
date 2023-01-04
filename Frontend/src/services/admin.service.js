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
            });
    }
    getClass() {
        console.log("Get class start");
        return axios
            .post(API_URL + "get-class", { headers: header })
            .then(function (response) {
                const classData = JSON.stringify(response.data);
                localStorage.setItem("class", classData);
            });
    }
    getSubject() {
        return axios
            .post(API_URL + "get-subject", { headers: header })
            .then(function (response) {
                const subject = JSON.stringify(response.data);
                localStorage.setItem("subject", subject);
            });
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
    classDelete(className) {
        return axios.delete(API_URL + "xoa-lop", {
            className,
        });
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

    SubjectUpdate(oldName, newName, grade) {
        return axios.post(API_URL + "cap-nhat-mon", {
            oldName,
            newName,
            grade,
        });
    }
    SubjectDelete(name) {
        return axios.delete(API_URL + "xoa-mon", {
            name,
        });
    }
    SubjectAdd(name, grade) {
        return axios.get(API_URL + "them-mon", {
            name,
            grade,
        });
    }
    register(username, email, password, role) {
        return axios.post(API_URL + "dang-ky", {
            username,
            password,
            email,
            role,
        });
    }
}

export default new Admin();
