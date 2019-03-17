const express = require('express');
const router = express.Router();

router.get('/',function(req,res) {
    let kw = req.query.kw;
    let uid = req.query.uid
    let sql = `select * from goods where details like '%${kw}%' or gname like '%${kw}%';`
    let sql2 = `INSERT INTO history (uid,kw) values (${uid},'${kw}');`
    conn.query(sql,function(err, result){
        if(err) {
            console.log(err)
            res.json({
                r:'数据库错误'
            })
            return
        }
        conn.query(sql2,function(err2,result2) {
            if(err2) {
                console.log(err2)
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


})

router.get('/getHistory',function(req,res){
    let uid = req.query.uid;
    let sql = 'SELECT * FROM `history` where uid = ? and status = 1;'
    conn.query(sql,uid,function(err,result) {
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