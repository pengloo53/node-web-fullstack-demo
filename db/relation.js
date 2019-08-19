const sequelize = require('./connect.js').sequelize;
// 用户表
const User = require('./models/User.js');
const Role = require('./models/Role.js');
const Permission = require('./models/Permission.js');
// 配置表
// const Address = require('./models/Address.js');
// 资源表
const Student = require('./models/Student.js');
// const Teacher = require('./models/Teacher.js');
// 业务数据表
// const Info

User.belongsToMany(Role, { as: 'Role', through: 'user_role'});
Role.belongsToMany(User, { as: 'User', through: 'user_role'});
Role.belongsToMany(Permission, { as: 'Permission', through: 'role_permission'});
Permission.belongsToMany(Role, { as: 'Role', through: 'role_permission'});

module.exports = {
    User,
    Role,
    Permission,
    Student
}

if( process.env.RESET_DB === 'yes' ){
    sequelize.sync();
}else if(process.env.RESET_DB === 'force'){
    sequelize.sync({ force: true });
}else{
    return ;
}
