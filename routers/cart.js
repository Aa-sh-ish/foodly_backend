const router = require('express').Router();
const cartController = require('../controllers/cartController');
const {verifyAndAuthorization} = require('../middlewares/verifyToken');

router.post('/',verifyAndAuthorization,cartController.addProductToCart);

router.post('/decrement/:productId',verifyAndAuthorization,cartController.decrementProductQty);

router.delete('/delete/:productId',verifyAndAuthorization,cartController.removeProductFromCart);

router.get('/',verifyAndAuthorization,cartController.fetchUserCart);

router.get('/count',verifyAndAuthorization,cartController.getCartCount);

router.delete('/clear',verifyAndAuthorization,cartController.clearUserCart);

module.exports = router;