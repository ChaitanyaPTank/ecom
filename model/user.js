const { Sequelize, Op, Model, DataTypes } = require("sequelize");

const sequelize = new Sequelize("ecom", "chaitanya", "", {
    host: "127.0.0.1",
    dialect: "mysql"
});

const User = sequelize.define("User", {
    // Model attribs / props are here
    user: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},
    {
        timestamps: false
    });

module.exports = User;