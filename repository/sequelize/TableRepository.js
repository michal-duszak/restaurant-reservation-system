const Sequelize = require('sequelize');

const Table = require('../../model/sequelize/Table');
const Guest = require('../../model/sequelize/Guest');
const Reservation = require('../../model/sequelize/Reservation');

exports.getTables = () => {
    return Table.findAll();
};


exports.getTableById = (tableID) => {
    return Table.findByPk(tableID,
        {
            include: [{
                model: Reservation,
                as: 'reservations',
                include: [{
                    model: Guest,
                    as: 'guest'
                }]
            }]
        });
};


exports.createTable = (newTableData) => {
    return Table.create({
        maxGuests: newTableData.maxGuests,
        outside: newTableData.outside,
    });
};

exports.updateTable = (tableID, tableData) => {
    return Table.update(tableData, { where: { _id: tableID } });
}

exports.deleteTable = (tableID) => {
    return Table.destroy({
        where: { _id: tableID }
    });
}

exports.deleteManyTables = (tableIDs) => {
    return Table.find({ _id: { [Sequelize.Op.in]: tableIDs } })
}