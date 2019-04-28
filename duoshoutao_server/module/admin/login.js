const express = require('express');
const router = express.Router();

router.post('/', function(req, res) {
    let data = req.body;
    console.log(data)
    let sql = 'SELECT * FROM suser where uname = ?'
    conn.query(sql, [data.name], function(err, result) {
        if (err) {
            console.log(err)
            res.json({ r: "数据库错误" })
            return;
        }
        console.log(result.length)
        if (result.length == 0) {
            res.json({ r: 'no_user' });
            return
        }
        if (data.password !== result[0].password) {
            res.json({ r: 'p_err' });
            return;
        } else {
            res.json({
                r: 'ok',
                uid: result[0].uid,
                admin: result[0].admin
            });
            return;
        }
    })
})



module.exports = router;