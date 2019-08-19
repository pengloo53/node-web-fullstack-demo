var Sequelize = require('sequelize');
var db = require('../connect.js');

module.exports = db.defineModel('resource_student', {
    stuid: Sequelize.STRING(100),       // 学号
    name: Sequelize.STRING(20),         // 姓名
    gender: Sequelize.STRING(2),        // 性别
    city: Sequelize.STRING(20),         // 城市
    district: Sequelize.STRING(20),     // 区县
    street: Sequelize.STRING(50),       // 街道
    road: Sequelize.STRING(50),         // 道路
    uptown: Sequelize.STRING(50),       // 小区
    door: Sequelize.STRING(50),         // 门牌号
    address: Sequelize.STRING(255),     // 家庭住址
    grade: Sequelize.STRING(20),        // 年级
    class_: Sequelize.STRING(20),       // 班级
    enter_date: Sequelize.STRING(20),   // 入学年月
    state: {
        type: Sequelize.BIGINT(1),
        allowNull: false,
        defaultValue: 0
    }                                   // 0为激活状态，1禁用状态
});
