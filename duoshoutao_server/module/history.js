const express = require('express');
const router = express.Router();


router.get('/getHistory', function(req, res){
    let uid = req.query.uid
    let sql = "select * from history as f left join goods as g on f.gid = g.gid where f.uid = ?";
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