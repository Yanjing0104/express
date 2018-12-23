var express = require('express');
var router = express.Router();
var bodyparse = require('body-parser');
var connection = require('../../config/db');
var sqlSentence = require('../common/sqlSentence')
router.use(bodyparse.urlencoded({ extended: false }))
router.use(bodyparse.json())
router.post('/save',function (req,res) {
    let sql=sqlSentence.insert('article',req.body).sql
    let arr=sqlSentence.insert('article',req.body).arr
    connection.query(sql,arr,function (err,result) {
        if (err) throw err;
        if (result.affectedRows ==1){
              res.json({
                  code:'200',
                  status:'success',
                  msg:'发布成功'
              })
          }
        else {
              res.json({
                  code:'500',
                  status:'error',
                  msg:'发布失败'
              })
          }
    })
})
router.post('/list',(req,res)=>{
    connection.query("select * from article",(err,result)=>{
        if (err) throw err;
        res.json({
            code:'200',
            status:'success',
            data:result
        })
    })
})
router.post('/detail',(req,res)=>{
    let id=req.body.id
    connection.query("select * from article where id="+id,(err,result)=>{
        if (err) throw err;
        if(result.length>0){
           res.json({
               code:'200',
               status:'success',
               data:result[0]
           })
       }
       else{
           res.json({
               code:'500',
               status:'error',
               msg:'找不到这篇文章'
           })
       }
    })
})

module.exports = router