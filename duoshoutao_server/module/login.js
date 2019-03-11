const express = require('express');
const router = express.Router();
router.post('/',function(req, res) {
    let data = req.body;
    console.log(data)
    let sql = 'SELECT * FROM user where uname = ?'
    conn.query(sql,data.uname, function(err, result){
        if(err){
            console.log(err)
			res.json({r:"数据库错误"})
			return;
        }
        if(data.password !== result[0].password){
            res.json({r:'p_err'});
            return ;
        } else {
            res.json({r:'ok',
            uid: result[0].uid});
            return ;
        }     
    })
})


module.exports = router;