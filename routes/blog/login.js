var express = require('express');
var router = express.Router();
var bodyparse = require('body-parser');
var connection = require('../../config/db');
var sqlSentence = require('../common/sqlSentence')
router.use(bodyparse.urlencoded({ extended: false }))
router.use(bodyparse.json())
router.post('/check',function (req,res) {
    var {account,password} = req.body;
    connection.query('select * from user where account = ? and password = ?',[account,password],function (err,result) {
        if (err) throw err;
        if (result.length > 0){
            res.json({
                code:'200',
                data:{
                    userId:result[0].id,
                    username:result[0].username
                },
                status:'success',
                msg:'登录成功'
            })
        } else {
            res.send({
                code:'500',
                status:'error',
                msg:'用户名或密码错误'
            })
        }
    })
})
router.post('/register',function (req,res) {
    var {account} = req.body;
    connection.query('select * from user where account = ? ',[account],function (err,result) {
        if (err) throw err;
        if (result.length > 0){
            res.json({
                code:'500',
                status:'err',
                msg:'该账号已存在'
            })
        } else {
            let sql=sqlSentence.insert('user',req.body).sql
            let arr=sqlSentence.insert('user',req.body).arr
            connection.query(sql,arr,function (err,result) {
                if (err) throw err;
                if (result.affectedRows ==1){
                    res.json({
                        code:'200',
                        status:'success',
                        data:{
                          userId:result.insertId
                        },
                        msg:'注册成功'
                    })
                }
                else {
                    res.json({
                        code:'500',
                        status:'error',
                        msg:'注册失败'
                    })
                }
            })
        }
    })
})

module.exports = router