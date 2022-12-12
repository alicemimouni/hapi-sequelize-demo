const Connection = require('./../dbconfig');
const {
    DataTypes
} = require('sequelize');

const dbConnection = Connection.connect;

const Users = dbConnection.define('users', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstname: {
        type: DataTypes.STRING
    },
    lastname: {
        type: DataTypes.STRING
    },
    username: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
}, {
    freezeTableName: true,
    timestamps: false
});


// create user
module.exports.createUser = function (username, password, firstname, lastname) {
    Users.create({
        username,
        password,
        firstname,
        lastname
    }).then((data) => {
        console.log(data.toJSON());
    })
}

// find one by id
// module.exports.findOneUser = function (user_id) {
//     Users.findOne({user_id}).then((data) => {
//         return data;
//     })
// }