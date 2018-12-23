var express = require('express');
var router = express.Router();
var login = require('./blog/login');
var article = require('./blog/article');
/* GET home page. */
router.use("/login",login);
router.use("/article",article);

module.exports = router;
