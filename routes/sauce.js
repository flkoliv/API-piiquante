const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config');
const sauceCtrl = require('../controllers/sauce');

router.post('/',multer, sauceCtrl.createSauce);
router.delete('/', sauceCtrl.deleteSauce);
router.get('/', sauceCtrl.getAllSauces);
router.get('/:id', sauceCtrl.getOneSauce);

module.exports = router;