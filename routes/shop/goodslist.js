var express = require('express');
var router = express.Router();
var bodyparse = require('body-parser');
var connection = require('../../config/db');
router.use(bodyparse.urlencoded({ extended: false }))
router.use(bodyparse.json())
router.get('/getListh1',(req,res)=>{
    connection.query('select * from category where pid=0',(err,result)=>{
        res.json(result)
    })
})
router.get('/getListh2',(req,res)=>{
    var cid=req.query.cid
    connection.query('select * from category where pid='+cid,(err,result)=>{
        res.json(result)
    })
})
router.get('/getlist',(req,res)=>{
    connection.query("select * from goods",(err,result)=>{
        res.json(result)
    })
})
router.get('/deletegoods',(req,res)=>{
    let gid=req.query.gid
    connection.query('delete from goods where gid='+gid,(err,result)=>{
        if (result.affectedRows==1){
            res.send('success')
        }
        else {
            res.send('fail')
        }
    })
})

module.exports = router