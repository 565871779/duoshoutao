const express = require('express');
const router = express.Router();

router.get('/getUserInfo', function(req, res){
    let uid = req.query.uid;
    let sql = 'select * from user where uid = ?;'
    conn.query(sql, [uid], function(err, result) {
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

router.post('/changePs', function(req, res){
    let uid = req.body.uid;
    let ps = req.body.password
    let usedPs = req.body.usedPs
    let sql= 'update user set password = ? where uid = ?;'
    let sql2 = 'select `password` from `user` where uid = '+ uid;
    conn.query(sql2, function(err,results){
        if(err) {
            console.log(err)
            res.json({
                r:'数据库错误'
            })
            return
        }
        if(results[0].password === usedPs) {
            conn.query(sql,[ps,uid], function(err, result) {
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
        } else {
            res.json({
                r: 'pserr'
            })
        }
    })

})
router.post('/changePhone', function(req, res){
    let uid = req.body.uid;
    let phone = req.body.tel
    let sql = 'update user set phone = ? where uid = ?;'
    conn.query(sql,[phone, uid], function(err, result) {
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


module.exports = router;