const qaController = require('../controllers/qaController');
const router = require('express').Router();
router.post('/',qaController.createMcq);
router.get('/',qaController.getMcq);

module.exports=router;