const express = require('express');
const router = express.Router();
router.post('/',function(req, res) {
    let data = req.body;
    console.log(req.session)
    if(data.captcha.toLowerCase() != req.session.coder.toLowerCase()){
        res.json({r:'coder_err'});
        return ;
    }
    let param;
    let sql;
    console.log(data)
    sql = 'SELECT * FROM user where uname = ?'
    param = data.uname
    conn.query(sql,param, function(err, result){
        if(err){
            console.log(err)
			res.json({r:"数据库错误"})
			return;
        }
        if (result.length === 0) {
            res.json({r:'no_user'});
            return
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