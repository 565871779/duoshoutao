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

module.exports = router;