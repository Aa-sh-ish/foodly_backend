const router = require('express').Router();
const orderController = require('../controllers/orderController');
const {verifyAndAuthorization} = require('../middlewares/verifyToken');

router.post('/',verifyAndAuthorization,orderController.placeOrder);

router.get('/:id',verifyAndAuthorization,orderController.getOrderDetail);

router.get('/user-order',verifyAndAuthorization,orderController.getUserOrder);

router.put('/rate/:id',verifyAndAuthorization,orderController.rateOrders);

router.put('/status/:id',verifyAndAuthorization,orderController.UpateOrderStatus);

router.put('/payment-status/:id',verifyAndAuthorization,orderController.updatePaymentStatus);

module.exports = router;