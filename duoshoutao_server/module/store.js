const express = require('express');
const router = express.Router();
router.get('/home', function(req, res){
    let sid = req.query.sid;
    let sql = 'select * from goods where sid = ?;'
    conn.query(sql, [sid], function(err, result) {
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

router.get('/getStoreDetail', function(req, res){
    let sid = req.query.sid;
    let sql = 'select * from store where sid = ?;'
    conn.query(sql, [sid], function(err, result) {
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

router.get('/search', function(req, res){
    let kw = req.query.kw;
    let sid = req.query.sid
    let sql = `select * from goods where sid = ${sid} and details like '%${kw}%' or sid = ${sid} and gname like '%${kw}%' ;`
    conn.query(sql, function(err, result) {
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


router.get('/fan', function(req, res){
    let sid = req.query.sid;
    let uid = req.query.uid;
    let sql = 'INSERT into scollect (sid,uid,collectTime) values (?,?,?);'
    conn.query(sql, [sid,uid, new Date().getTime()], function(err, result) {
        if(err) {
            console.log(err)
            res.json({
                r:'数据库错误'
            })
            return
        }
        let sql = `update store set fans = fans + '1' where sid = ?`;
        conn.query(sql, sid, function(errs,reqs) {
            if(errs) {
                console.log(errs)
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
})
router.get('/cancelfan', function(req, res){
    let sid = req.query.sid;
    let uid = req.query.uid;
    let sql = 'update scollect set status = 0 where sid = ? and uid = ?'
    conn.query(sql, [sid,uid ], function(err, result) {
        if(err) {
            console.log(err)
            res.json({
                r:'数据库错误'
            })
            return
        }
        let sql = `update store set fans = fans - '1' where sid = ?`;
        conn.query(sql, sid, function(errs,ress) {
            if(errs) {
                console.log(errs)
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
})

router.get('/checkfans', function(req, res){
    let sid = req.query.sid;
    let uid = req.query.uid;
    let sql = 'select * from scollect where sid = ? and uid = ? and status = 1'
    conn.query(sql, [sid,uid ], function(err, result) {
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
router.get('/getStoreName', function(req, res){
    let sid = req.query.sid;
    let sql = 'select sname from store where sid = ?'
    conn.query(sql, sid, function(err, result) {
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

router.get('/getCollectList', function(req, res){
    let uid = req.query.uid; 
    let sql = 'select * from scollect where uid = ? and status = 1'
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

module.exports = router;