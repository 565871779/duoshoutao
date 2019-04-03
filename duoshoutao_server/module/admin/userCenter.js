const express = require('express');
const router = express.Router();

router.get('/getUserInfo', function(req,res) {
	let data = req.query;
	console.log(data);
    let sql1 = `SELECT * FROM suser where uid = ?`;
    conn.query(sql1, data.uid, function(err, result){
        if(err){
            console.log(err)
			res.json({r:"数据库错误"})
			return;
        }
        res.json({
            r: result
        })
    })	
});

router.post('/updateInfo', function(req,res) {
	let data = req.body;
	console.log(data);
    let sql1 = `update suser set uhead = ?, phone = ? where uid = ?`;
    conn.query(sql1, [data.imageUrl, data.phone, data.uid], function(err, result){
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

router.post('/updatePass', function(req,res) {
	let data = req.body;
	console.log(data);
    let sql1 = `update suser set password = ? where uid = ?`;
    conn.query(sql1, [data.password, data.uid], function(err, result){
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