const router = require("express").Router();
const teacherController = require("../controllers/teacherController");
const middleController = require("../controllers/middlewareController");
const getData = require("../middlewares/getData");

// Chạy để load dữ liệu mỗi khi chuyển route
router.post("/get-age", getData.getAge);
router.post("/get-class", getData.getClass);
router.post("/get-subject", getData.getSubject);
router.post("/get-student", getData.availableStudent);

// Màn hình tiêp nhận học sinh
// {
//     name: req.body.name,
//     gender: req.body.gender,
//     birthDay: req.body.birthDay,
//     address: req.body.address,
//     email: req.body.email
// }
router.post(
    "/tiep-nhan",
    middleController.verifyTeacher,
    teacherController.signStudent,
);

// Màn hình lập danh sách lớp
// {
//     "idList":["63b7ed5f824c409175a11e55","63b7ed65824c409175a11e9a"],
//     "className": "10A2"
// }
router.post(
    "/lap-danh-sach",
    middleController.verifyTeacher,
    teacherController.classListAssign,
);

// Màn hình tra cứu học sinh
// {
//     "term": true,
//     "subjectName": "Toán"
//   }
router.post(
    "/tra-cuu",
    middleController.verifyTeacher,
    teacherController.studentSearch,
);

// Màn hình cập nhật điểm nút CHỌN
// {
//     className: ,
//     term: ,
//     subjectName: ,
// }
router.get("/cap-nhat-diem", getData.getGradeSummary);

//Màn hình cập nhật điểm nút CẬP NHẬT
// {
//     "subjectName": "Toán",
//     "term": true,
//     "changeList": [
//       {
//         "studentID": "63b7ed5f824c409175a11e55",
//         "fifteen": 7,
//         "midterm": 7,
//         "lastterm": 7
//       },
//       {
//         "studentID": "63b7ed65824c409175a11e9a",
//         "fifteen": 6,
//         "midterm": 6,
//         "lastterm": 6
//       }
//     ]
// }
router.post("/cap-nhat-diem", teacherController.gradeUpdate);

// Màn hình tổng kết môn
// {
//     "term": true,
//     "subjectName": "Toán"
// }
router.post(
    "/tong-ket-mon",
    middleController.verifyTeacher,
    teacherController.subjectSummary,
);

module.exports = router;
