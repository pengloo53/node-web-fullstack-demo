var express = require('express');
var router = express.Router();

/**
 *  后台首页 /b
 */

router.get('/', function (req, res, next) {
  res.render('index', {
    sidebar: 'index',
    pageInfo: {
      title: '后台首页',
    }
  });
});


/**
 *  student 管理页面
 */
router.use('/student', function(req, res, next){
  res.locals.sidebar = 'student'
  next();
});

router.get('/student/list', function(req, res, next){
  res.render('pages/student-list', {
    pageInfo: {
      title: '学生列表',
      desc: '当前在校学生'
    }
  });
});

router.get('/student/add', function(req, res, next){
  res.render('pages/student-add', {
    pageInfo: {
      title: '添加学生',
      desc: ''
    }
  });
});

module.exports = router;
