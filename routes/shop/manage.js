var express = require('express');
var router = express.Router();
var bodyparse = require('body-parser');
var connection = require('../../config/db');
router.use(bodyparse.urlencoded({ extended: false }))
router.use(bodyparse.json())
router.get('/getCategory',(req,res)=>{
    connection.query("select * from category where pid=0",(err,result)=>{
        res.json(result)
    })
})
router.post('/addCategory',(req,res)=>{
    let {cname,pid}=req.body
    connection.query(`insert into category (cname,pid) values ('${cname}','${pid}')`,(err,result)=>{
        if (result.affectedRows==1){
            res.send('success')
        }
        else {
            res.send('fail')
        }
    })

})
router.get('/getallCategory',(req,res)=>{
    connection.query('select * from category',(err,result)=>{
        res.json(result)
    })
})
router.get('/deleteCategory',(req,res)=>{
    let cid=req.query.cid
    connection.query('delete from category where cid='+cid,(err,result)=>{
        if (result.affectedRows==1){
            res.send('success')
        }
        else {
            res.send('fail')
        }
    })
})

module.exports = router