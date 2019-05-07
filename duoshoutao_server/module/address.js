const express = require('express');
const router = express.Router();


router.get('/getAddressList', function(req, res){
    let uid = req.query.uid;
    let aid = req.query.aid;
    let sql;
    let id;
    if (aid ) {
        sql = 'select * from address where aid = ?';
        id = aid
    } else {
        sql = 'select * from address where uid = ?';
        id = uid
    }
    conn.query(sql, id, function(err, result) {
        if(err) {
            console.log(err)
            res.json({
                r:'数据库错误'
            })
            return
        }
        res.json({
            r: result
        })
    })

})

router.get('/getAddress', function(req, res){
    let sql;
    let uid = req.query.uid;
    let aid = req.query.aid;
    let id;
    if (aid) {
        sql = 'select * from address where aid = ? ';
        id = aid;
    } else {
        sql = 'select * from address where uid = ? and isdefault = 1';
        id = uid;
    }
    conn.query(sql, id, function(err, result) {
        if(err) {
            console.log(err)
            res.json({
                r:'数据库错误'
            })
            return
        }
        res.json({
            r: result
        })
    })

})

router.post('/saveAddress', function(req, res){
    let par = req.body;
    let sql;
    let arr;
    if ( par.aid === undefined) {
        sql = 'INSERT INTO address (sname,sphone,saddress,detailadd,postcode,areaCode,uid,isdefault) values (?,?,?,?,?,?,?,?)';
        arr = [par.sname, par.sphone, par.saddress, par.detailadd, par.postcode, par.areaCode, par.uid, par.default]
    } else {
        arr = [par.sname, par.sphone, par.saddress, par.detailadd, par.postcode, par.areaCode, par.uid, par.default, par.aid]
        sql = 'update address set sname = ?, sphone = ?, saddress = ?, detailadd = ?, postcode = ?, areaCode = ?, uid = ?, isdefault = ? where aid = ?';
    }
    if (par.default === 1) {
        let sql2 = 'update address set isdefault = 0 where uid = ? and isdefault = 1'
        conn.query(sql2, par.uid, function(err, result) {
            if(err) {
                console.log(err)
                res.json({
                    r:'数据库错误'
                })
                return
            }
            conn.query(sql, arr, function(err, result) {
                if(err) {
                    console.log(err)
                    res.json({
                        r:'数据库错误'
                    })
                    return
                }
                res.json({
                    r: 'ok'
                })
            })
        })
    } else {
        conn.query(sql, arr, function(err, result) {
            if(err) {
                console.log(err)
                res.json({
                    r:'数据库错误'
                })
                return
            }
            res.json({
                r: 'ok'
            })
        })
    }
})


module.exports = router;