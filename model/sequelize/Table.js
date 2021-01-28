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
        },
        isMoreThanEight(value) {
            if (value > 8) {
              throw new Error('Podaj właściwą liczbę (od 1 do 8)!');
            }
          },
          isLessThanEight(value) {
            if (value < 1) {
                console.log(value)
              throw new Error('Podaj właściwą liczbę (od 1 do 8)!');
            }
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
