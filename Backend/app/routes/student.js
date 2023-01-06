const router = require('express').Router();
const studentController = require('../controllers/studentController');
const middleController = require('../controllers/middlewareController');
const getData = require('../middlewares/getData');

// Chạy để load dữ liệu mỗi khi chuyển route
router.post('/get-class',getData.getClass);
router.post('/get-subject',getData.getSubject);

//
router.post('/tra-cuu',getData.getGradeSummary);
router.post('/tong-ket',getData.termSummary);

module.exports = router;