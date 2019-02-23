const express = require('express');
const router = express.Router();
router.post('/',function(req, res){
    let data = req.body;
    let sql1 = "SELECT * FROM user where uname = ?";//查询用户名是否存在
    conn.query(sql1, data.username, function(err, result) {
        if(err) {
            res.json({
                data: null,
                errCode: 0,
                ErrMsg: '数据库错误'
            })
            return
        }
        if (results.length) {
            res.json({
                data: null,
                errCode: 1,
                ErrMsg: '用户名已存在'
            })
            return
        } else {
           let sql = 'INSERT INTO user (uname,usex,phone,password,role) values (?,?,?,?,?)';
           let param = [data.uname, data.usex, data.phone, data.password, data.role] ;
           conn.query(sql, param, function(err, result) {
            if(err) {
                res.json({
                    data: null,
                    errCode: 0,
                    ErrMsg: '数据库错误'
                })
                return
            }
            res.json({
                data: 'ok',
                errCode: 0,
                ErrMsg: null
            })
           })        
        }
    })
})

module.exports = router;
