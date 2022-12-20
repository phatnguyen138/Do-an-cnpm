const router = require('express').Router();
const adminController = require('../controllers/adminController');
const middlewareController = require('../controllers/middlewareController');
const getData = require('../middlewares/getData');

//Route admin
// URL = "/admin"

// Chạy để load dữ liệu mỗi khi chuyển route
router.post('/get-age',getData.getAge);
router.post('/get-class',getData.getClass);
router.post('/get-subject',getData.getSubject);

// Cap nhat quy dinh tuoi
router.post('/quy-dinh-tuoi',middlewareController.verifyAdmin,adminController.ageUpdate);

//Cap nhat quy dinh lop
router.post('/cap-nhat-lop',middlewareController.verifyAdmin,adminController.classUpdate);
// Xoa lop
router.delete('/cap-nhat-lop',middlewareController.verifyAdmin,adminController.classDelete);
// Them lop
router.get('/cap-nhat-lop',middlewareController.verifyAdmin,adminController.classAdd);

//Cap nhat lop
router.post('/cap-nhat-mon',middlewareController.verifyAdmin,adminController.subjectUpdate);
// Xoa lop
router.delete('/cap-nhat-mon',middlewareController.verifyAdmin,adminController.subjectDelete);
// Them lop
router.get('/cap-nhat-mon',middlewareController.verifyAdmin,adminController.subjectAdd);

// Them tai khoan
router.post('/dang-ky',middlewareController.verifyAdmin,adminController.register);


module.exports = router;
