var express = require('express');
var router = express.Router();
var bodyparse = require('body-parser');
var connection = require('../../config/db');
router.use(bodyparse.urlencoded({ extended: false }))
router.use(bodyparse.json())
router.get('/shoplist',function (req,res) {
    let status=req.query.status
    let page=req.query.page
    let search=req.query.search
    connection.query(`select * from shop where status=${status} and shopname like '%${search}%' order by sid asc`,function (err, result) {
        let data=result.slice((page-1)*3,page*3)
        let total=result.length
        res.json({data,total})
    })
})
router.get('/deleteList',function (req, res) {
    let sid=req.query.sid
    connection.query("delete from shop where sid="+sid,function (err, result) {
        if (result.affectedRows==1){
            res.send('success')
        }
        else {
            res.send('fail')
        }
    })
})
router.get('/getone',function (req,res){
    let sid=req.query.sid
    connection.query("select * from shop where sid="+sid,function (err, result) {
        res.json(result[0])
    })
})
router.get('/audit',(req,res)=>{
    let sid=req.query.sid,status=req.query.status
    connection.query(`update shop set status=${status} where sid=${sid}`,(err,result)=>{
        if (result.affectedRows==1){
            res.send('success')
        }
        else {
            res.send('fail')
        }
    })
})

module.exports = router