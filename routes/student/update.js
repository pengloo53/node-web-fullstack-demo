var express = require('express');
var router = express.Router();
// formidable
var formidable = require('formidable');
var xlsx = require('node-xlsx');
// moment
var moment = require('moment');

// api
const studentHandler = require('../../db/handler/studentHandler.js');

// 常量
const USER = '';

// 学生列表信息
router.post('/del', function(req, res, next) {
    let id = req.body.id;
    studentHandler.delStudent(id, function(p){
        res.send(p);
    });
});

// 添加学生
router.post('/add', function(req, res, next){
    let name = req.body.name;
    let stuid = req.body.stuid;
    let gender = req.body.gender;
    let city = req.body.city;
    let district = req.body.district;
    let street = req.body.street;
    let road = req.body.road;
    let uptown = req.body.uptown;
    let door = req.body.door;
    let address = city + district + street + road + uptown + door + '';
    let grade = req.body.grade;
    let class_ = req.body.class;
    let bz = req.body.bz;
    let data = {
        stuid,
        name,
        gender,
        city,
        district,
        street,
        road,
        uptown,
        door,
        address,
        grade,
        class_,
        bz,
        createdBy: USER || 'admin',
        updatedBy: USER || 'admin'
    };
    studentHandler.addStudent(data, function(err){
        if(err){ return next(err); }
        res.send({message: 'ok'});
    });
});

// 批量添加学生
router.post('/upload', function(req, res, next){
    var form = new formidable.IncomingForm();
    // 批量创建的 data 
    var jsonData = [];
    form.encoding = 'utf-8';
    form.on('file', function (name, file) {
        // 只接收xlsx格式的文件
        if (file.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
            req.flash('error', '请按照模版上传excel文档');
            return res.redirect('back');
        }
        var xlsxData = xlsx.parse(file.path);
        var sheet1Data = xlsxData[0].data;  // Sheet1 数据
        if (sheet1Data[0][0] != '学号（没有可不填）') {
            req.flash('error','请下载正确模板，填写内容，然后上传');
            return res.redirect('back');
        }
        // return res.send(JSON.stringify(sheet1Data));
        sheet1Data.forEach( (lineData,index) => {
            if( index === 0 ){ return; }
            var temp = {
                stuid: lineData[0] || '',
                name: lineData[1],
                gender: lineData[2],
                grade: lineData[3],
                class_: lineData[4],
                city: lineData[5],
                district: lineData[6],
                street: lineData[7],
                road: lineData[8],
                uptown: lineData[9],
                door: lineData[10],
                enter_date: lineData[11],
                address: lineData[12],
                bz: lineData[13],
                createdBy: USER || 'admin',
                updatedBy: USER || 'admin'
            };
            if(temp.name){    // 姓名存在，则添加
                jsonData.push(temp);
            }
        });
        console.log(JSON.stringify(jsonData));
    });
    form.parse(req, function (err,fields,files) {
        // console.log('parse function');
        studentHandler.uploadStudent(jsonData, function(p){
            console.log(p);
            // if(err){ next(err); }
            req.flash('success', '上传成功！');
            return res.redirect('back');
        });
    });
});

module.exports = router;
