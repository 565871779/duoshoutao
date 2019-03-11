const express = require('express');
const router = express.Router();


router.get('/getShopCarList', function(req, res){
    let uid = req.query.uid;
    let sql= `select * from goods as g left join shopcar as s on g.gid= s.gid where s.uid = ?`;
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


module.exports = router;