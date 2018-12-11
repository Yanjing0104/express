var express = require('express');
var router = express.Router();
var admission = require('./shop/admission');
var login = require('./shop/login')
var manage = require('./shop/manage')
var goodslist = require('./shop/goodslist')
var goodsadd = require('./shop/goodsadd')
/* GET users listing. */
router.use('/admission',admission)
router.use('/login',login)
router.use('/manage',manage)
router.use('/goodslist',goodslist)
router.use('/goodsadd',goodsadd)


module.exports = router;
