const sequelize = require('./sequelize');

const Guest = require('../../model/sequelize/Guest');
const Reservation = require('../../model/sequelize/Reservation');
const Table = require('../../model/sequelize/Table');

module.exports = () => {
    Guest.hasMany(Reservation, {as: 'reservations', foreignKey: {name: 'guest_id', allowNull: false}, constraints: true, onDelete: 'CASCADE'});
    Reservation.belongsTo(Guest, {as: 'guest', foreignKey: {name: 'guest_id', allowNull: false} } );
    Table.hasMany(Reservation, {as: 'reservations', foreignKey: {name: 'table_id', allowNull: false}, constraints: true, onDelete: 'CASCADE'});
    Reservation.belongsTo(Table, {as: 'table', foreignKey: {name: 'table_id', allowNull: false} });

    let allGuests, allTables;
    return sequelize
        .sync({force: true})
        .then( () => {
            return Guest.findAll();
        })
        .then(guests => {
            if( !guests || guests.length == 0 ) {
                return Guest.bulkCreate([
                    {firstName: 'Jan', lastName: 'Kowalski', email: 'jan.kowalski@acme.com', tel: '500500500'},
                    {firstName: 'Adam', lastName: 'Zieliński', email: 'adam.zielinski@acme.com', tel: '520332500'},
                    {firstName: 'Marian', lastName: 'Nowak', email: 'marian.nowak@acme.com', tel: '424300242'},
                ])
                .then( () => {
                    return Guest.findAll();
                });
            } else {
                return guests;
            }
        })
        .then( guests => {
            allGuests = guests;
            return Table.findAll();
        })
        .then( tables => {
            if( !tables || tables.length == 0 ) {
                return Table.bulkCreate([
                    { maxGuests: 8, outside: "true" },
                    { maxGuests: 8, outside: "true" },
                    { maxGuests: 6, outside: "false"},
 ])
                .then( () => {
                    return Guest.findAll();
                });
            } else {
                return tables;
            }
        })
        .then( tables => {
            allTables = tables;
            return Reservation.findAll();
        })
        .then(reservations => {
            if( !reservations || reservations.length == 0 ) {
                return Reservation.bulkCreate([
                    {guest_id: allGuests[0]._id, table_id: allTables[0]._id, orderNumber: 2, date: "20-12-2020", time: "17:30", numberOfGuests: 5},
                    {guest_id: allGuests[1]._id, table_id: allTables[1]._id, orderNumber: 3, date: "15-12-2020", time: "15:30", numberOfGuests: 5},
                    {guest_id: allGuests[2]._id, table_id: allTables[2]._id, orderNumber: 4, date: "10-12-2020", time: "16:45", numberOfGuests: 5}
                      ]);
            } else {
                return reservations;
            }
        });
};



// return Reservation.bulkCreate([
//     {res_id: allEmps[0]._id, res_id: allEmps[0]._id, name: "Jan Kowalski", date: "23-10-2020", time: '20:20', numberOfGuests: '4', tableNumber: '2'},
//     {res_id: allEmps[1]._id, res_id: allEmps[1]._id, name: "Jan Kowalski", date: "25-08-2020", time: '10:20', numberOfGuests: '1', tableNumber: '3'},
//     {res_id: allEmps[2]._id, res_id: allEmps[2]._id, name: "Jan Kowalski", date: "24-11-2020", time: '18:20', numberOfGuests: '3', tableNumber: '1'},
// ])
// .then( () => {


//     return Table.bulkCreate([
//         {emp_id: allEmps[0]._id, dept_id: allDepts[0]._id, number: 2, maxGuests: 4},
//         {emp_id: allEmps[1]._id, dept_id: allDepts[1]._id, number: 3, maxGuests: 2},
//         {emp_id: allEmps[2]._id, dept_id: allDepts[2]._id, number: 4, maxGuests: 1}
//           ]);