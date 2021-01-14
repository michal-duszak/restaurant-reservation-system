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
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "To pole jest wymagane"
            }
        }
    },
    date: {
        type: Sequelize.STRING,
        allowNull: false ,
        validate: {
            notEmpty: {
                msg: "To pole jest wymagane"
            }
        }
    },
    time: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "To pole jest wymagane"
            }
        }
    },
    
    numberOfGuests: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "To pole jest wymagane"
            }
        }
    },
});

module.exports = Reservation;