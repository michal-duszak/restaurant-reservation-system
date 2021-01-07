const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Reservation = sequelize.define('Reservation', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    orderNumber: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    date: {
        type: Sequelize.STRING,
        allowNull: false 
    },
    time: {
        type: Sequelize.STRING,
        allowNull: false
    },
    
    numberOfGuests: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
});

module.exports = Reservation;