// 用户表
const { User } = require('./relation.js');

User.create({
    id: 1,
    email: 'admin@90byte.com',
    username: '90byte',
    userid: '100001',
    passwd: '21232f297a57a5a743894a0e4a801fc3',
    state: 0,
    createdBy: 'root',
    updatedBy: 'root',
    createdAt: new Date(),
    updatedAt: new Date()
}).then(function(res){
    console.log(res);
});
