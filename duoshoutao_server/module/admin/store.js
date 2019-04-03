const express = require('express');
const router = express.Router();

router.get('/getStoreList', function(req,res) {
	let data = req.query;
	console.log(data);
    let sql1 = `SELECT * FROM store where uid = ?`;
    let sql2 = `select * from goods where sid = ?`;
    conn.query(sql1, data.uid, function(err, result){
        if(err){
            console.log(err)
			res.json({r:"数据库错误"})
			return;
        }
        for ( let i = 0 ;i < result.length; i++) {
            conn.query(sql2, result[i].sid, function(er, results) {
                result[i].selled = results[0].price * results[0].sellNumber
                if (i == result.length - 1) {
                    res.json({
                        r: result
                    })
                }
            })
        }
    })	
});

router.get('/getGoodsInfo', function(req,res) {
	let data = req.query;
	console.log(data);
    let sql1 = `SELECT * FROM goods where sid = ?`;
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
router.get('/getGoods', function(req,res) {
	let data = req.query;
	console.log(data);
    let sql1 = `SELECT * FROM goods where gid = ?`;
    conn.query(sql1, data.gid, function(err, result){
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

router.post('/addGoods', function(req,res) {
	let data = req.body;
	console.log(data);
    let sql1 = `INSERT INTO goods (gname,sid,details,imageUrl,price,inventory,classify) values (?,?,?,?,?,?,?)`;
    let par = [data.gname,data.sid,data.detail,data.imageUrl,data.price,data.inventory,data.classify]
    conn.query(sql1, par, function(err, result){
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
router.post('/saveGoods', function(req,res) {
	let data = req.body;
	console.log(data);
    let sql1 = `update goods set gname=?,details=?,imageUrl=?,price=?,inventory=?,classify=? where gid=?`;
    let par = [data.gname,data.detail,data.imageUrl,data.price,data.inventory,data.classify,data.gid]
    conn.query(sql1, par, function(err, result){
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