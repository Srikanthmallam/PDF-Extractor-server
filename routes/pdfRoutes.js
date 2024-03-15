const {Router} = require('express');
const multer = require('multer');
const authotization = require("../middleware/auth");
const upload = multer();

const {uploadPdf,userPdfs, deletePdf,} = require('../controllers/pdfContoller')

const router = Router();

router.post('/uploadPdf',upload.single('pdfFile'),uploadPdf)
router.get('/userpdfs/:id',authotization,userPdfs);
router.delete('/deletepdf/:id',authotization,deletePdf)


module.exports = router;