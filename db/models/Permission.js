var Sequelize = require('sequelize');
var db = require('../connect.js');

module.exports = db.defineModel('permission', {
    name: Sequelize.STRING(100),
    desc: Sequelize.STRING(200)
});
