const router = require('express').Router();
const userController = require('../controllers/userController')

const  {verifyAndAuthorization}= require('../middlewares/verifyToken')

router.get('/',verifyAndAuthorization,userController.getUser)
router.delete('/',verifyAndAuthorization,userController.deleteUser)
router.put('/',verifyAndAuthorization,userController.UpdateUser)

module.exports=router;