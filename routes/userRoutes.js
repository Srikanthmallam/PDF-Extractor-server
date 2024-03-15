const {Router} = require('express');
const authotization = require('../middleware/auth');

const {register,Login,getUser} = require('../controllers/userControllers');

const router = Router();


router.post("/register",register);
router.post("/login",Login);
router.get("/getuser/:id",authotization,getUser);


module.exports = router;