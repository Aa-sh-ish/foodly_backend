const router = require('express').Router();
const restaurantController = require('../controllers/restaurantController')

const  {verifyAndAuthorization,verifyVendor}= require('../middlewares/verifyToken')

router.post('/',verifyAndAuthorization,restaurantController.addRestaurant)

router.get('/byId/:id',restaurantController.getRestaurant)

router.get('/:code',restaurantController.getRandomResturants)

router.delete('/:id',verifyVendor,restaurantController.deleteRestaurant)

router.patch('/:id',verifyVendor,restaurantController.serviceAvaibility)

module.exports=router;