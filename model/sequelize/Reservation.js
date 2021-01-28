const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Reservation = sequelize.define('Reservation', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    guest_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "To pole jest wymagane"
            }
        }
    },
    table_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "To pole jest wymagane"
            }
        }
    },
    orderNumber: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "To pole jest wymagane"
            },
            maxCustom(value) {
                if (value > 99) {
                  throw new Error('Oczekuję liczby w przedziale od 1 do 99!');
                }
              },
              minCustom(value) {
                if (value < 1) {
                  throw new Error('Oczekuję liczby w przedziale od 1 do 99!');
                }
              }
        }
    },
    date: {
        type: Sequelize.STRING,
        allowNull: false ,
        validate: {
            notEmpty: {
                msg: "To pole jest wymagane"
            },
            isDate(value) {
                let dateReg = /^\d{2}([./-])\d{2}\1\d{4}$/
                if (!dateReg.test(value)) {
                    throw new Error("Zły format daty! Oczekuję dd-mm-rrrr");
    
                }
              } 
        }
    },
    time: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "To pole jest wymagane"
            },
            isTime(value) {
                let timeReg = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/
                if (!timeReg.test(value)) {
                    throw new Error("Zły format godziny! Oczekuję gg:mm");
    
                }
              }
        }
    },
    
    numberOfGuests: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "To pole jest wymagane"
            },
            isInt: {
                msg: "Oczekuję liczby!"
            },
            maxCustom(value) {
                if (value > 8) {
                  throw new Error('Oczekuję liczby w przedziale od 1 do 8!');
                }
              },
              minCustom(value) {
                if (value < 1) {
                  throw new Error('Oczekuję liczby w przedziale od 1 do 8!');
                }
              }
        }
    },
});

module.exports = Reservation;