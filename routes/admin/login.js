var express = require('express');
var router = express.Router();
var bodyparse = require('body-parser');
var connection = require('../../config/db');
router.use(bodyparse.urlencoded({ extended: false }))
router.use(bodyparse.json())
router.post('/check',function (req,res) {
    var {username,password} = req.body;
    connection.query('select * from manage where username = ? and password = ?',[username,password],function (err,result) {
        if (result.length > 0){
            res.send('success')
        } else {
            res.send('fail')
        }
    })
})

module.exports = router