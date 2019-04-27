const express = require('express');
const router = express.Router();


router.get('/cancelOrder', function(req,res) {
	let data = req.query;
    let sql1 = 'update `order` set status = 6 where oid = ?';
    conn.query(sql1, data.oid, function(err, result){
        if(err){
            console.log(err)
			res.json({r:"数据库错误"})
			return;
        }
        res.json({
            r: 'ok'
        })
    })	
});

router.get('/confirmlOrder', function(req,res) {
	let data = req.query;
    let sql1 = "update `order` set status = 4 where oid = ?";
    conn.query(sql1, data.oid, function(err, result){
        if(err){
            console.log(err)
			res.json({r:"数据库错误"})
			return;
        }
        res.json({
            r: 'ok'
        })
    })	
});

module.exports = router;