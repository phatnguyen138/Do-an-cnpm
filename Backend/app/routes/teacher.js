const router = require('express').Router();
const teacherController = require('../controllers/teacherController');
const middleController = require('../controllers/middlewareController');
const getData = require('../middlewares/getData');

// Chạy để load dữ liệu mỗi khi chuyển route
router.post('/get-age',getData.getAge);
router.post('/get-class',getData.getClass);
router.post('/get-subject',getData.getSubject);
router.post('/get-student',getData.availableStudent);


router.post('/tiep-nhan', middleController.verifyTeacher, teacherController.signStudent);

router.post('/lap-danh-sach', middleController.verifyTeacher, teacherController.classListAssign);

router.post('/tra-cuu', middleController.verifyTeacher,teacherController.studentSearch);

router.get('/cap-nhat-diem',getData.getGradeSummary);

router.post('/cap-nhat-diem', teacherController.gradeUpdate);

router.post('/tong-ket-mon',middleController.verifyTeacher,teacherController.subjectSummary);


module.exports = router;
