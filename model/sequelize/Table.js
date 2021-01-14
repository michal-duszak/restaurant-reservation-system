const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Table = sequelize.define('Table', {
   _id: {
       type: Sequelize.INTEGER,
       autoIncrement: true,
       allowNull: false,
       primaryKey: true
   },
   maxGuests: {
       type: Sequelize.INTEGER,
       allowNull: false,
       validate: {
        notEmpty: {
            msg: "To pole jest wymagane"
        }
    }
       
   },
    outside: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "To pole jest wymagane"
            }
        }
    }
});

module.exports = Table;
