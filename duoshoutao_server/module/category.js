const express = require('express');
const router = express.Router();


router.get('/', function(req, res){
    let par = req.query;
    console.log(par)
    let sql = 'select * from goods where classify = ? LIMIT ?,8';
    conn.query(sql, [ par.name, par.page*8 ], function(err, result) {
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