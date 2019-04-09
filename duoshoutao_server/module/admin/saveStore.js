const express = require('express');
const router = express.Router();

router.post('/',(req,res)=>{
	let data = req.body;
	console.log(data);
	let sql1 = `SELECT * FROM store where sname = ?`;
	conn.query(sql1, data.sname,function(err,results){
		if(err){
            console.log(err)
			res.json({r:"数据库错误"})
			return;
		}
		if (results.length) {
			res.json({r:"user_existed"})
			return;
		} else {
			let sql = "INSERT INTO store (sname,uid,detail,imageUrl) values (?,?,?,?)";
			let data1 = [data.sname,data.uid,data.detail,data.imageUrl]
			conn.query(sql,data1,function(err,results){
			if(err){
			console.log(err);
			return;
            }
            res.json({r:'ok'});
		})
		}	
	})
		
});

router.post('/update',(req,res)=>{
	let data = req.body;
	console.log(data);
	let sql1 = `SELECT * FROM store where sname = ?`;
	conn.query(sql1, data.sname,function(err,results){
		if(err){
            console.log(err)
			res.json({r:"数据库错误"})
			return;
		}
		if (results.length && results[0].sid != data.sid) {
			res.json({r:"user_existed"})
			return;
		} else {
			let sql = "update store set sname = ?, detail = ?, imageUrl = ? where sid = ?";
			let data1 = [data.sname,data.detail,data.imageUrl,data.sid]
			conn.query(sql,data1,function(err,results){
			if(err){
			console.log(err);
			return;
            }
            res.json({r:'ok'});
		})
		}	
	})
		
});

router.get('/getStoreInfo', function(req,res) {
	let data = req.query;
    let sql1 = `SELECT * FROM store where sid = ?`;
    conn.query(sql1, data.sid, function(err, result){
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
module.exports = router;