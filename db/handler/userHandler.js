const { User, Role, Permission } = require('../relation.js');

// 根据用户名，密码查询用户
exports.checkUserByUserid = (userid, passwd, callback) => {
    User.findOne({
        where: {
            userid: userid,
            passwd: passwd,
            state: 0
        }
    }).then(user => {
        callback(user);
    });
}

// 根据用户名，密码查询用户
exports.checkUserByEmail = (email, passwd, callback) => {
    User.findOne({
        where: {
            email: email,
            passwd: passwd,
            state: 0
        }
    }).then(user => {
        callback(user);
    });
}
