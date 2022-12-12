const Sequelize = require('sequelize');

const sequelize = new Sequelize('hapi-api', 'root', '', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
});

// get all users
module.exports.getUsers = async function() {
    try {
        await sequelize.authenticate();
        console.log("Connected");
        const [results, metadata] = await sequelize.query('SELECT * FROM users');
        return results;
    }
    catch(err) {
        console.log("Cant' connect to the database");
    }
}

// get one user 
module.exports.getUser = async function () {
    try {
        await sequelize.authenticate();
        console.log("Connected");
        const [results, metadata] = await sequelize.query("SELECT * FROM users WHERE user_id=:user_id;");
        return results;
    }
    catch(err) {
        console.log("Cant' connect to the database");
    }
}

// get user by id
module.exports.getUserId = async function () {
    try {
        let user_id = req.params.user_id
        let product = await Users.findOne({ where: { user_id: user_id }})
        res.status(200).send(product)
    }
    catch(err) {
        console.log("Cant' connect to the database");
    }
}

module.exports.connect = sequelize;

