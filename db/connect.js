var Sequelize = require('sequelize');
// 引入数据库配置文件
var sqlConfig = require('config-lite')('db').mysql;

console.log('init sequelize...');
console.log('mysql配置：' + JSON.stringify(sqlConfig));

var sequelize = new Sequelize(sqlConfig.database, sqlConfig.user, sqlConfig.password, {
    host: sqlConfig.host,
    dialect: 'mysql',
    pool: {
        max: 10,
        min: 0,
        idle: 10000
    },
    timezone: '+08:00' //东八时区
});

exports.sequelize = sequelize;

exports.defineModel = function (name, attributes) {
    var attrs = {};
    attrs.id = {
        type: Sequelize.BIGINT(11),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    };
    for (var key in attributes) {
        var value = attributes[key];
        if (typeof value === 'object' && value.type) {
            value.allowNull = value.allowNull || false;
            attrs[key] = value;
        } else {
            attrs[key] = {
                type: value,
                // allowNull: false
            };
        }
    }
    attrs.version = {
        type: Sequelize.BIGINT,
        // allowNull: false
    };
    attrs.createdBy = {
        type: Sequelize.STRING,
        allowNull: false
    };
    attrs.updatedBy = {
        type: Sequelize.STRING,
        allowNull: false
    };
    attrs.bz = {
        type: Sequelize.STRING(500)
    };
    return sequelize.define(name, attrs, {
        sequelize,
        // modelName: name,
        tableName: name,
        timestamps: true,
        paranoid: true, 
        charset: 'utf8mb4', 
        collate: 'utf8mb4_general_ci',
    });
};
