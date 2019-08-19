var express = require('express');
var router = express.Router();

// api
const studentHandler = require('../../db/handler/studentHandler.js');

// 当前学生列表
router.get('/list', function(req, res, next) {
    let state = 0 ; // 代表当前在校
    studentHandler.getStudentList(state, function(p){
        res.send(p);
    });
});

// 根据地址查询学生信息
router.get('/searchFromAddress', function(req, res, next){
    var address = req.query.address;
    studentHandler.searchStudentsByAddress(address, function(p){
        var addressList = [];
        p.forEach(student => {
            if( addressList.indexOf(student.address) === -1 ){
                addressList.push(student.address);
            }
        });
        res.send(addressList);
    });
});

// 根据地址模糊查询学生信息
router.get('/studentByAddress', function(req, res, next){
    var address = req.query.address;
    studentHandler.getStudentsByAddress(address, function(p){
        res.render('partials/searchAddress-result', {
            studentList: p
        });
    });
});

module.exports = router;
