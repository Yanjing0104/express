var express = require('express');
var router = express.Router();
var login = require('./admin/login');
var check = require('./admin/check');
/* GET home page. */
router.use("/login",login);
router.use("/check",check);

module.exports = router;
