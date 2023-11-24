const router = require('express').Router();
const addressController = require('../controllers/addressController');
const {verifyAndAuthorization} = require('../middlewares/verifyToken');


router.post('/',verifyAndAuthorization,addressController.createAddres);

router.delete('/:id',verifyAndAuthorization, addressController.deleteAddress);

router.get('/default',verifyAndAuthorization,addressController.getDefaultAddress);

router.get('/',verifyAndAuthorization,addressController.getUserAddresses);

router.put('/:id',verifyAndAuthorization,addressController.updateAddress);

router.post('/default',verifyAndAuthorization,addressController.setDefaultAddess);

module.exports = router;