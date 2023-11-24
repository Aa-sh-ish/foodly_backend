const router = require('express').Router();
const driverController = require('../controllers/driverController')

const  {verifyDriver,verifyAndAuthorization}= require('../middlewares/verifyToken')

router.post('/',verifyAndAuthorization,verifyDriver,driverController.registerDriver);

router.patch('/:id',verifyDriver,driverController.setDriverAvailability)

module.exports=router;