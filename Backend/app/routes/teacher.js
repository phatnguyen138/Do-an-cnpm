const router = require('express').Router();
const teacherController = require('../controllers/teacherController')
const middleController = require('../controllers/middlewareController')

router.get('/tiep-nhan',middleController.getClassList);
router.post('/tiep-nhan', middleController.verifyTeacher, teacherController.signStudent);

router.get('/lap-danh-sach',middleController.availableStudents);
router.post('/lap-danh-sach', middleController.verifyTeacher, teacherController.classListAssign);

router.post('/tra-cuu', middleController.verifyTeacher,teacherController.studentSearch);


router.post('/cap-nhat-diem', middleController.verifyTeacher);

router.post('/tong-ket-mon',middleController.verifyTeacher);

module.exports = router;
