const { Sequelize, DataTypes } = require("sequelize");

// connecting to DB
const sequelize = new Sequelize("ecom", "chaitanya", "", {
    host: "127.0.0.1",
    dialect: "mysql"
});

// this is the schema or the model of our simple database
const Product = sequelize.define("Product", {
    product: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: "products"
})

module.exports = Product;