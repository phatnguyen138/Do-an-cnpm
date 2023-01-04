import axios from "axios";

const API_URL = "http://localhost:8080/auth/";

class AuthService {
    login(username, password) {
        console.log("start login");
        return axios
            .post(API_URL + "login", {
                username,
                password,
            })
            .then((response) => {
                if (response.data.accessToken) {
                    localStorage.setItem(
                        "user",
                        JSON.stringify(response.data),
                    );
                    console.log("Get data",response.data)
                }

                
            });
    }

    logout() {
        localStorage.removeItem("user");
        localStorage.removeItem("class");
        localStorage.removeItem("age");
        localStorage.removeItem("subject");
    }

    register(username, email, password, role) {
        return axios.post(API_URL + "register", {
            username,
            password,
            email,
            role,
        });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem("user"));
    }
}

export default new AuthService();
