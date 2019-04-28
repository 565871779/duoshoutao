const express = require('express');
const router = express.Router();

router.get('/getStoreList', function(req, res) {
    let data = req.query;
    console.log(data);
    let now = new Date().getTime()
    let sql = `update adminstore set status = 0 where endtime < ?`
    conn.query(sql, now, function(er, resu) {
        if (er) {
            console.log(er)
            res.json({ r: "数据库错误" })
            return;
        }
        // let sql = `update goods set status `
        let sql1 = `SELECT s.sid, s.uid, s.imageUrl,s.sname,s.detail ,a.status,a.reason,a.endtime,a.time,a.starttime,su.uname FROM store as s left join adminstore as a on s.sid = a.sid left join suser as su on a.uid = su.uid;`;
        conn.query(sql1, data.uid, function(err, result) {
            if (err) {
                console.log(err)
                res.json({ r: "数据库错误" })
                return;
            }
            res.json({
                r: result
            })
        })
    })

});

router.get('/getSuserList', function(req, res) {
    let data = req.query;
    console.log(data);
    let now = new Date().getTime()
    let sql = `update adminsuser set status = 0 where endtime < ?`
    conn.query(sql, now, function(er, resu) {
        if (er) {
            console.log(er)
            res.json({ r: "数据库错误" })
            return;
        }
        // let sql = `update goods set status `
        let sql1 = `SELECT s.uid, s.uhead,s.uname as suname,s.phone ,a.status,a.uname as auname,a.reason,a.endtime,a.time,a.starttime FROM suser as s left join adminsuser as a on s.uid = a.suid where s.admin != 1;`;
        conn.query(sql1, data.uid, function(err, result) {
            if (err) {
                console.log(err)
                res.json({ r: "数据库错误" })
                return;
            }
            res.json({
                r: result
            })
        })
    })

});

router.post('/banStore', function(req, res) {
    let data = req.body;
    console.log(data);
    let sql = `insert into adminstore (sid,uid,reason,starttime,endtime,time) values (?,?,?,?,?,?)`;
    let par = [data.sid, data.uid, data.reason, data.starttime, data.endtime, data.time]
    conn.query(sql, par, function(err, result) {
        if (err) {
            console.log(err)
            res.json({ r: "数据库错误" })
            return;
        }
        let sql = `update goods set status = 3 where sid = ?;`;
        conn.query(sql, data.sid, function(err2, result2) {
            if (err2) {
                console.log(err)
                res.json({ r: "数据库错误" })
                return;
            }
            res.json({
                r: 'ok'
            })
        })

    })
});

router.post('/banSuser', function(req, res) {
    let data = req.body;
    console.log(data);
    let sql = `insert into adminsuser (suid,uid,reason,starttime,endtime,time, uname) values (?,?,?,?,?,?,?)`;
    let par = [data.suid, data.uid, data.reason, data.starttime, data.endtime, data.time, data.uname]
    conn.query(sql, par, function(err, result) {
        if (err) {
            console.log(err)
            res.json({ r: "数据库错误" })
            return;
        }
        res.json({
            r: 'ok'
        })
        // let sql = `update goods set status = 3 where sid = ?;`;
        // conn.query(sql, data.sid, function(err2, result2) {
        //     if (err2) {
        //         console.log(err)
        //         res.json({ r: "数据库错误" })
        //         return;
        //     }
        //     res.json({
        //         r: 'ok'
        //     })
        // })

    })
});

router.get('/cancelBanStore', function(req, res) {
    let data = req.query;
    console.log(data);
    let sql = `delete from adminstore where sid = ?`;
    conn.query(sql, data.sid, function(err, result) {
        if (err) {
            console.log(err)
            res.json({ r: "数据库错误" })
            return;
        }
        res.json({
            r: 'ok'
        })
    })
});

router.get('/cancelBanSuser', function(req, res) {
    let data = req.query;
    console.log(data);
    let sql = `delete from adminsuser where suid = ?`;
    conn.query(sql, data.suid, function(err, result) {
        if (err) {
            console.log(err)
            res.json({ r: "数据库错误" })
            return;
        }
        res.json({
            r: 'ok'
        })
    })
});

module.exports = router;