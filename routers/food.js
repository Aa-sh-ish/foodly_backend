const router = require('express').Router();
const foodConteroller = require('../controllers/foodController');
const {verifyVendor} = require('../middlewares/verifyToken');


router.post('/',verifyVendor, foodConteroller.addFood);

router.post('/tags/:id',verifyVendor,foodConteroller.addFoodTags);

router.post('/type/:id',verifyVendor,foodConteroller.addFoodType);

router.get('/id/:id',foodConteroller.getFoodById);

router.get('/:category/:code',foodConteroller.getRandomFoodByCodeAndCategory);

router.delete('/:id',verifyVendor,foodConteroller.deletefoodByID);

router.patch('/:id',verifyVendor,foodConteroller.foodAvaliability);

router.get('/restaurant/:restaurant',foodConteroller.getFoodByRestaurant);

module.exports = router;