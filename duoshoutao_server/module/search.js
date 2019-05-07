const express = require('express');
const router = express.Router();

router.get('/',function(req,res) {
    let kw = req.query.kw;
    let uid = req.query.uid
    let sql = `select * from goods where details like '%${kw}%' or gname like '%${kw}%';`
    conn.query(sql,function(err, result){
        if(err) {
            console.log(err)
            res.json({
                r:'数据库错误'
            })
            return
        }
        if (uid === 'null') {
            res.json({
                r: result
            })
        } else {
            let sql2 = `INSERT INTO history (uid,kw) values (${uid},'${kw}');`
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
        }
        
        
    })
})

router.get('/searchStore',function(req,res) {
    let kw = req.query.kw;
    let uid = req.query.uid
    let sql = `select * from store where sname like '%${kw}%';`
    let sql2 = `INSERT INTO history (uid,kw) values (${uid},'${kw}');`
    conn.query(sql,function(err, result){
        if(err) {
            console.log(err)
            res.json({
                r:'数据库错误'
            })
            return
        }
        if (uid === 'null') {
            res.json({
                r:result
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
            if (result.length === 0) {
                res.json({
                    r: result
                })
                return
            } 
            let sql = `select imageUrl from goods where sid = ${result[0].sid} limit 3;`
            conn.query(sql, function(err3, result3){
                if(err3) {
                    res.json({
                        r:'数据库错误'
                    })
                    return
                }
                result[0].children = result3
                res.json({
                    r:result
                })

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