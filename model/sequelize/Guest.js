const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Guest = sequelize.define('Guest', {
   _id: {
       type: Sequelize.INTEGER,
       autoIncrement: true,
       allowNull: false,
       primaryKey: true,
   },
   firstName: {
       type: Sequelize.STRING,
       allowNull: false,
       validate: {
        notEmpty: {
            msg: "Pole jest wymagane"
        },
        len: {
            args: [2,60],
            msg: "Pole powinno zawierać od 2 do 60 znaków"
        },
    }
   },
   lastName: {
       type: Sequelize.STRING,
       allowNull: false,
       validate: {
        notEmpty: {
            msg: "Pole jest wymagane"
        },
        len: {
            args: [2,60],
            msg: "Pole powinno zawierać od 2 do 60 znaków"
        },
    }
   },
    tel: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
        notEmpty: {
            msg: "Pole jest wymagane"
        },
        len: {
            args: [9,60],   
            msg: "Wymagany prawidłowy numer telefonu"
        },
        isNumber(value) {
            value = value.toString();
            value.replace("-", "");
            value.replace(" ", "");
            let reg = new RegExp('^[0-9+]+$');
            if (!reg.test(value)) {
                throw new Error("Pole musi zawierać prawidłowy numer telefonu!");

            }
          } 
    }
},
   email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
        notEmpty: {
            msg: "Pole jest wymagane"
        },
        len: {
            args: [5,60],   
            msg: "To pole musi zawierać 5-60 znaków"
        },
        isEmail: {
            msg: 'Nieprawidłowy adres email'
        }
    }
},

});

module.exports = Guest;