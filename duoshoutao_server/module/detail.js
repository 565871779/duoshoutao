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

router.get('/addHistory', function(req, res){
    let gid = req.query.gid;
    let uid = req.query.uid;
    let sql = "INSERT INTO history (uid,gid) values (?,?);";
    conn.query(sql,[uid, gid], function(err, result) {
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


router.post('/addShopCar', function(req, res){
    let gid = req.body.gid;
    let uid = req.body.uid;
    let creatTime = req.body.creatTime * 1;
    let loseTime = req.body.loseTime * 1;
    let number = req.body.number;
    let sql = "insert into shopcar (uid,gid,creatTime,loseTime,number) values (?,?,?,?,?)";
    conn.query(sql, [ uid, gid, creatTime, loseTime,number], function(err, result) {
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