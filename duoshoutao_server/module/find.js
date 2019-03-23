const express = require('express');
const router = express.Router();


router.get('/', function(req, res){
    let type = req.query.type;
    let sql = "select * from find as f left join goods as g on f.gid = g.gid where type = ? ";
    conn.query(sql, type, function(err, result) {
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