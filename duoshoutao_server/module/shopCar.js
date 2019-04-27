const express = require('express');
const router = express.Router();


router.get('/getShopCarList', function(req, res){
    let uid = req.query.uid;
    let time = new Date().getTime() + ''
    let sql= `select * from goods as g left join shopcar as s on g.gid= s.gid where s.uid = ? and s.status = 0`;
    conn.query(sql,uid, function(err, result) {
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

router.get('/delect', function(req, res){
    let id = req.query.id;
    let sql= `update shopcar set status = 2 where id = ${id}`;
    conn.query(sql, function(err, result) {
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