import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/student/';

class UserService {
  getPublicContent() {
    console.log("header: ",authHeader())
    return axios.get(API_URL + 'all');
  }

  getClass() {
      console.log("Get class start");
      return axios
          .post(API_URL + "get-class")
          .then(function (response) {
              const classData = JSON.stringify(response.data);
              localStorage.setItem("class", classData);
          });
  }

  getSubject() {
      console.log("Get subject start");
      return axios
          .post(API_URL + "get-subject")
          .then(function (response) {
              const subject = JSON.stringify(response.data);
              localStorage.setItem("subject", subject);
          });
  }

  search(className,subjectName,term){
    return axios
          .post(API_URL + "tra-cuu",
            {
              className,
              subjectName,
              term
            }
          );
  }
}

export default new UserService();
