const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
// router.get('/',(req,res)=>{
// 	res.render('./register');
// });
router.post('/',(req,res)=>{
	let data = req.body;
	console.log(data);
	let sql1 = "SELECT * FROM user where uname = ?";
	conn.query(sql1,data.uname,function(err,results){
		if(err){
			res.json({r:"数据库错误"})
			return;
		}
		if(results.length){
			res.json({r:"user_existed"})
			return;
		}else{
			let sql = "INSERT INTO user (uname,usex,phone,password,role) values (?,?,?,?,?)";
			let data1 = [data.uname,data.usex,data.phone,data.password,data.role]
			conn.query(sql,data1,function(err,results){
			if(err){
			console.log(err);
			return;
            }
            res.json({r:'ok'});
			// let sql2 = "SELECT * FROM user where uname = ?";
			// conn.query(sql2,data.username,function(err,result){
			// 	req.session.uid = result[0].uid;
        	// 	req.session.uname = result[0].uname;
        	// 	req.session.uhead = '../assets/uhead.jpg';
        	// 	req.session.admin = result[0].admin;
        	// 	res.json({r:'ok'});
			// })
		})
		}	
	})
});

module.exports = router;
