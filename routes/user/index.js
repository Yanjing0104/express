var express = require('express');
var router = express.Router();
var bodyparse = require('body-parser');
var connection = require('../../config/db');
router.use(bodyparse.urlencoded({ extended: false }))
router.use(bodyparse.json())
router.get('/getmenu',(req,res)=>{
    connection.query('select * from goods;select * from category',(err,result)=>{
        let banner =result[0]
        let cate=result[1]
        let category=tree(cate)
        res.send({banner,category})

        function tree(cate) {
            let map={}
            let value=[]
            cate.forEach(function (ele) {
                map[ele.cid]=ele
            })
            cate.forEach(function (element) {
                let pid=element.pid
                let parent=map[pid]
                if (parent){
                    if (!parent.children){
                        parent.children=[]
                    }
                    parent.children.push(element)
                }
                else {
                    value.push(element)
                }
            })
            return value
        }
    })
})
router.get('/getlist',(req,res)=>{
    let {cid,page}=req.query
    connection.query("select goods.*,shop.shopname from goods,shop where h1=? and goods.sid=shop.sid",[cid],(err,result)=>{
        let obj={}
        obj.total=Math.ceil(result.length/4)
        let data=result.slice((page-1)*4,page*4)
        obj.data=data
        res.json(obj)
    })
})

router.get('/getdetail',(req,res)=>{
    let gid=req.query.gid
    connection.query("select goods.*,shop.shopname from goods,shop where gid=? and goods.sid=shop.sid",[gid],(err,result)=>{
        res.json(result)
    })
})
router.get('/getshop',(req,res)=>{
    let sid=req.query.sid
    connection.query("select shop.* from shop where shop.sid=?;select * from goods where sid=?",[sid,sid],(err,result)=>{
        res.json(result)
    })
})
module.exports = router