import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/admin/";
var token = authHeader();
class Admin {
    ageUpdate(minAge, maxAge) {
        console.log("token", token);
        return axios.post(
            API_URL + "quy-dinh-tuoi",
            {
                minAge,
                maxAge,
            },
            { headers: authHeader() },
        );
    }
    classUpdate(newName, newAttend) {
        return axios.post(
            API_URL + "cap-nhat-lop",   
            {
                newName,
                newAttend,
            },
            { headers: authHeader() },
        );
    }
    classDelete(className) {
        return axios.delete(API_URL + "xoa-lop", {
            className,
        });
    }
    classAdd(className, attend) {
        return axios.get(
            API_URL + "them-lop",
            {
                className,
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
