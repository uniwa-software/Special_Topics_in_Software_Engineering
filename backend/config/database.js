const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('personnel', 'nikos', 'nikos', {
    host: 'localhost', 
    dialect: 'mysql', 
});

module.exports = sequelize;
