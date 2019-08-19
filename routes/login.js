var express = require('express');
var router = express.Router();

// https
const https = require('https');
// config 
const captcha = require('config-lite')('db').captcha;

// handler
const userHandler = require('../db/handler/userHandler.js');

function getIp(req){
    var remoteIp = req.ip.match(/\d+\.\d+\.\d+\.\d+/);
    if (remoteIp) {
        return JSON.stringify(remoteIp);
    } else {
        return '127.0.0.1';
    }
}
function setQueryConfig(queryConfig){
    var _str = '?';
    for(var o in queryConfig){
        if(queryConfig[o] != -1){
            _str += o + '=' + queryConfig[o] + '&';
        }
    }
    _str = _str.substring(0, _str.length-1);
    return _str;
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('login', {
      pageInfo:{
          title: '登陆页面',
      }
  });
});

// 登陆
router.post('/', function(req, res, next){
  var username = req.body.username;
  var password = req.body.password;
  if (!username || !password) {
      req.flash('error', '请填写完整');
      return res.redirect('/login');
  }
  // 如果不是邮箱登陆
  if (username.indexOf('@') === -1) {
      // 员工号登陆
      userHandler.checkUserByUserid(username, password, function (user) {
        if (!user) {
            req.flash('error', '用户名或密码不正确');
            return res.redirect('/login');
        }
        req.session.user = user;
        res.redirect('/b');
      });
  } else {
      // 邮箱登陆
      userHandler.checkUserByEmail(username, password, function (user) {
        if (!user) {
            req.flash('error', '用户名或密码不正确');
            return res.redirect('/login');
        }
        req.session.user = user;
        res.redirect('/b');
      });
  }
});

// 验证码登陆
router.post('/verify', function (req, res, next) {
    var Ticket = req.body.Ticket;
    var Randstr = req.body.Randstr;
    var UserIP = getIp(req);
    var data = {
        aid: captcha.aid,
        AppSecretKey: captcha.AppSecretKey,
        Ticket: Ticket,
        Randstr: Randstr,
        UserIP: UserIP
    };
    var url = 'https://ssl.captcha.qq.com/ticket/verify' + setQueryConfig(data);
    https.get(url, function (response) {
        var body = [];
        response.on('data', function (chunk) {
            body.push(chunk);
        });
        response.on('end', function () {
            body = JSON.parse(Buffer.concat(body));
            // res.set('Content-Type', 'application/json;charset=utf-8');
            console.log(body);
            if (body.response == 1) {
                res.status(200).send({
                    "code": 0,
                    "msg": "ok"
                });
                res.end();
                // res.send('hello,world');
            }
        });
    }).on('error', function (e) {
        console.error(e);
    });
});

// 登出
router.get('/out', function(req, res, next){
    req.session.user = null;
    req.flash('info', '登出成功');
    res.redirect('/login');
});

module.exports = router;
