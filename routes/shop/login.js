var express = require('express');
var router = express.Router();
var bodyparse = require('body-parser');
var connection = require('../../config/db');
router.use(bodyparse.urlencoded({ extended: false }))
router.use(bodyparse.json())
router.post('/check',function (req,res) {
    var {username,password} = req.body;
    var statusObj={
        1:'审核通过',
        2:'审核未通过',
        3:'未审核'
    }
    console.log(username);
    console.log(password);
    connection.query('select * from shop where legalpersonphone = ? and password = ?',[username,password],function (err,result) {
        if (result.length==0){
            res.send({status:'fail',message:'用户名或密码错误'})
        }
        else {
            let status=result[0].status
            let sid=result[0].sid
            res.json({status:status,message:statusObj[status],sid})
        }
    })
})

module.exports = router