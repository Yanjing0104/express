var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/shop');
var admin = require('./routes/admin');
var shop = require('./routes/shop');
var user = require('./routes/user');
var blog = require('./routes/blog');
var multer=require('multer')
var upload=multer({dest:'uploads/'})
var fs=require('fs')


var app = express();

//设置跨域访问
app.all('*',function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));

app.use('/', indexRouter);
app.use('/blog', blog);
// app.use('/users', usersRouter);
// app.use('/admin', admin);
// app.use('/shop', shop);
// app.use('/user',user)



// app.post('/uploadimg',upload.single('file'),function (req,res) {
    // let file = req.file;
    // let date = new Date();
    // let dirname = [date.getFullYear(),date.getMonth()+1,date.getDate()].join('-');
    // // 日期对象  目录名字
    // let pathname = __dirname+'uploads/' + dirname;
    // // 储存路径
    // if (!fs.existsSync(pathname)){
    //     // 文件夹是否存在
    //     fs.mkdirSync(pathname);
    // }
    // res.send('1')
    // let filename = ''+date.getTime()+Math.floor(Math.random() * 100)+'.'+file.originalname.split('.').pop();
    // // ''防止计算 变成字符串
    // fs.readFile(file.path,function (err,data) {
    //     fs.writeFile(pathname+'/'+filename,data,function (err) {
    //         fs.unlinkSync(file.path);
    //         // 删除没用的文件
    //         res.send('/'+dirname+'/'+filename);
    //     });
    // })
    // res.render('uploadimg');
// });
app.post('/uploadimg',upload.single('file'),function (req,res) {
    let file=req.file;
    let date=new Date();
    let dirname=[date.getFullYear(),date.getMonth()+1,date.getDate()].join('-');
    let pathname=__dirname+'/uploads/'+dirname;                        //__dirname指的是当前目录
    if(!fs.existsSync(pathname)){
        fs.mkdirSync(pathname);
    }
    let filename = ''+date.getTime()+Math.floor(Math.random()*100)+'.'+file.originalname.split('.').pop();
    fs.readFile(file.path,upload.single('file'),function (err,data) {
        fs.writeFile(pathname+'/'+filename,data,function (err) {
            fs.unlinkSync(file.path);
            res.send('/'+dirname+'/'+filename);
        })
    })
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
