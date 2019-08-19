const { Student } = require('../relation.js');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
    // 根据状态查询学生列表
    getStudentList: function(state, callback){
        Student.findAll({
            where: {
                state: state
            }
        }).then(function(data){
            callback(data);
        }).catch(function(err){
            callback(err);
        });
    },
    // 添加学生
    addStudent: function(data, callback){
        Student.create(data).then(function(){
            callback();
        }).catch(function(err){
            callback(err);
        });
    },
    // 批量添加学生
    uploadStudent: function(data, callback){
        Student.bulkCreate(data).then(function(){
            callback();
        }).catch(function(err){
            callback(err);
        });
    },
    // 删除学生
    delStudent: function(id, callback){
        Student.destroy({
            where: {
                id: id
            }
        }).then(function(){
            callback();
        }).catch(function(err){
            callback(err);
        });
    },
    // 模糊查询
    searchStudentsByAddress: function(address, callback){
        Student.findAll({
            where: {
                address: {
                    [Op.like]: '%'+ address + '%'
                }
            }
        }).then(function(data){
            callback(data);
        });
    },
    // 精确查询
    getStudentsByAddress: function(address, callback){
        Student.findAll({
            where: {
                address: address
            }
        }).then(function(data){
            callback(data);
        });
    }
}
