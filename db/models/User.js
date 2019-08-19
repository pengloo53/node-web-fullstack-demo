var Sequelize = require('sequelize');
var db = require('../connect.js');

module.exports = db.defineModel('user', {
    email: {
        type: Sequelize.STRING(100),
        unique: true
    },
    username: Sequelize.STRING(20),
    userid: {
        type: Sequelize.STRING(20),
        unique: true
    },
    passwd: Sequelize.STRING(100),
    nick: Sequelize.STRING(100),
    state: {
        type: Sequelize.BIGINT(1),
        allowNull: false,
        defaultValue: 0
    },                                  // 0为激活状态，1禁用状态
    title: Sequelize.STRING(50),        // 用户Title
    gender: Sequelize.STRING(2),        // 性别
    avatar: Sequelize.STRING(100),      // 头像名
    skin: Sequelize.STRING(20),         // 皮肤
});
