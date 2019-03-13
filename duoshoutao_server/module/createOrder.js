const express = require('express');
const router = express.Router();

router.get('/', function(req, res){
    let gid = req.query.gid;
    let sql = "select * from goods where gid = ? ";
    conn.query(sql, gid, function(err, result) {
        if(err) {
            console.log(err)
            res.json({
                r:'数据库错误'
            })
            return
        }
        res.json({
            r: result
        })
    })
})

router.get('/getOrderList', function(req, res){
    let uid = req.query.uid;
    let sql = "select * from  goods as g left join `order` as o on o.gid = g.gid where o.uid = ?;";
    conn.query(sql, uid, function(err, result) {
        if(err) {
            console.log(err)
            res.json({
                r:'数据库错误'
            })
            return
        }
        res.json({
            r: result
        })
    })
})

router.post('/saveOrder', function(req, res){
    let par = req.body;
    let sql = "INSERT INTO `order` (uid,gid,submitTime,loseTime,aid,num) values (?,?,?,?,?,?);";
    conn.query(sql, [par.uid, par.gid, par.submitTime, par.loseTime, par.aid, par.num ], function(err, result) {
        if(err) {
            console.log(err)
            res.json({
                r:'数据库错误'
            })
            return
        }
        res.json({
            r: 'ok'
        })
    })

})
router.get('/getDetail', function(req, res){
    let oid = req.query.oid;
    let sql = "select * from  goods as g left join `order` as o on o.gid = g.gid where oid= ?;";
    conn.query(sql, oid, function(err, result) {
        if(err) {
            console.log(err)
            res.json({
                r:'数据库错误'
            })
            return
        }
        res.json({
            r: result
        })
    })
})

router.get('/getAddress', function(req, res){
    let aid = req.query.aid;
    let sql = "select * from  address where aid= ?;";
    conn.query(sql, aid, function(err, result) {
        if(err) {
            console.log(err)
            res.json({
                r:'数据库错误'
            })
            return
        }
        res.json({
            r: result
        })
    })
})



module.exports = router;