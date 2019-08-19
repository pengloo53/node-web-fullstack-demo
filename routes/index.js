/**
 * Router 规划
 */

module.exports = (app) => {
  // 配置
  app.use(function(req, res, next){
    res.locals.web = {
      title: 'STU',
      name: 'INFO',
      desc: '学生信息系统',
      verifier: 0
    };
    res.locals.userInfo = {
      username: 'admin',
      title: '管理员'
    }
    res.locals.url = req.url.split('?')[0];
    next();
  });

  // 网站首页
  app.get('/', function(req, res, next){
    res.redirect('/b');
  });
  
  // 登陆页面 
  app.use('/login', require('./login.js'));

  // 登陆权限控制：检测是否登陆
  app.use(function(req,res,next){
    if( !req.session.user ){
      req.flash('error', '未登录');
      return res.redirect('/login');
    }
    next();
  });

  // 后台管理员页面
  app.use('/b', require('./page.js'));
  
  // 学生管理
  app.use('/stu/data', require('./student/data.js'));
  app.use('/stu/update', require('./student/update.js'));

  // 用户页面
  app.use('/u', require('./users.js'));
}
