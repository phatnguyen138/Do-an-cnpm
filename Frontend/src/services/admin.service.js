import axios from "axios";

const API_URL = "http://localhost:8080/admin/";

class Admin {
    ageUpdate(minAge, maxAge) {
        return axios.post(API_URL + "quy-dinh-tuoi", {
            minAge,
            maxAge,
        });
    }
    classUpdate(newName,newAttend) {
        return axios.post(API_URL + "cap-nhat-lop", {
            newName,
            newAttend
        });
    }

}

export default new Admin();
