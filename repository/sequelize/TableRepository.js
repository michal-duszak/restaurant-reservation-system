const Sequelize = require('sequelize');

const Table = require('../../model/sequelize/Table');
const Guest = require('../../model/sequelize/Guest');
const Reservation = require('../../model/sequelize/Reservation');

exports.getTables = () => {
    return Table.findAll({
        include: [
            {
                model: Guest,
                as: 'guest'
            },
            {
                model: Reservation,
                as: 'reservations'
            }]
    });
};


exports.getTableById = (tableID) => {
    return Table.findByPk(tableID, {
        include: [
            {
                model: Guest,
                as: 'guest'
            },
            {
                model: Reservation,
                as: 'reservations'
            }]
    });
};

exports.createTable = (data) => {
    console.log(JSON.stringify(data));

    return Table.create({
        number: data.number,
        maxGuests: data.maxGuests,
    });
};

exports.updateTable = (tableID, data) => {
    return Table.update(data, { where: { _id: tableID } });
}

exports.deleteTable = (tableID) => {
    return Table.destroy({
        where: { _id: tableID }
    });
}

exports.deleteManyTabless = (tableIDs) => {
    return Table.find({ _id: { [Sequelize.Op.in]: tableIDs } })
}