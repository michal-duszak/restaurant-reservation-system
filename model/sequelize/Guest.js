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
       allowNull: false
   },
   lastName: {
       type: Sequelize.STRING,
       allowNull: false
   },
    tel: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
},
   email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
},

});

module.exports = Guest;