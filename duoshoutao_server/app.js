/*各种模块 */
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cookieParser = require('cookie-parser');
const session = require('express-session');
//为了同步操作
global.async = require('async');
//验证码
const svgCaptcha = require('svg-captcha');
const multer = require('multer');
const app = express();
/* 模块引用部分结束位置 */
//定义各种参数
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

let hostname = 'http://localhost:8088';
let secret = 'duoshoutao.www.one';
// 启用中间件
app.use(bodyParser.urlencoded({extended: true}));//表单数据类型
app.use(bodyParser.json());
app.use(cookieParser(secret));
//模板引擎设置
//app.engine('html', ejs.renderFile);
//app.set('view engine', 'html');
//app.set('views', './views');
//数据库连接
global.conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'123456',
    port:3306,
    database:'myduoshoutao',
    multipleStatements: true
});
conn.connect();
//启用session
app.use(session({
    secret:secret,
    resave:true,
    saveUninitialized: true,
    cookie: {maxAge:30*24*3600*1000}
}));

//文件上传
const diskstorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `./uploads/${new Date().getFullYear()}/${(new Date().getMonth()+1).toString().padStart(2, '0')}`);
    },
    filename: function (req, file, cb) {
        let filename = new Date().valueOf() + '_' +  Math.random().toString().substr(2, 8) + '.' + file.originalname.split('.').pop();
        cb(null, filename)
    }
});
const upload = multer({storage: diskstorage});
// 验证码图片
app.get('/coder', (req, res) => {
	//设置验证码的各种参数
    var captcha = svgCaptcha.create({noise:4,ignoreChars: '0o1i', size:1,background: '#cc9966',height:35, width:80});
    //把生成的验证码存到session里面,方便判断输入的验证码是否正确
	req.session.coder = captcha.text;
	// 使用ejs等模板时如果报错 res.type('html')
	res.type('svg'); 
	res.status(200).send(captcha.data);   
});

// 上传图片接口
app.post('/uploads', upload.array('images', 1000), (req ,res)=>{
    console.log(req.files);
    let data = [];
    for (const ad of req.files) {
        //把反斜线转成斜线，防止各种转义引起的路径错误
        let path = hostname + "/"+ ad.path.replace(/\\/g, '/');
        data.push(path);
    }
    res.json({
        "errno": 0,
        "data": data
    });
});

//子路由
//注册界面子路由
app.use('/register',require('./module/register'));

//登录界面子路由
app.use('/login',require('./module/login'));

//分类界面子路由
app.use('/category',require('./module/category'));

//商品详情界面子路由
app.use('/detail',require('./module/detail'));

//立即购买创建订单子路由
app.use('/createOrder',require('./module/createOrder'));

//获取购物车商品子路由
app.use('/shopCar',require('./module/shopCar'));

//收获地址子路由
app.use('/address', require('./module/address'))

//静态资源托管
app.use('/uploads', express.static('uploads'));
app.use(express.static('static'));
app.listen(8088, () => {
    console.log('成功启动...8088');
});
