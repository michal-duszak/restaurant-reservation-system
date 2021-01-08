const Sequelize = require('sequelize');

const Reservation = require('../../model/sequelize/Reservation');
const Guest = require('../../model/sequelize/Guest');
const Table = require('../../model/sequelize/Table');

exports.getReservations = () => {
    return Reservation.findAll(
    {include: [
    {
        model: Guest,
        as: 'guest'
    },
    {
        model: Table,
        as: 'table'
    }]
});
};
//to idzie do findall jak cos pojdize nie tak

exports.getReservationById = (reservationID) => {
    return Reservation.findByPk(reservationID,
        {
            include: [{
                model: Table,
                as: 'tables',
                include: [{
                    model: Guest,
                    as: 'guest'
                }]
            }]
        });
};

exports.createReservation = (data) => {
    console.log(JSON.stringify(data));

    return Reservation.create({
        res_id: data.res_id,
        name: data.name,
        date:data.date,
        time:data.time,
        numberOfGuests: data.numberOfGuests,
        tableNumber: data.tableNumber
    });
};

exports.updateReservation = (reservationId, data) => {
    return Reservation.update(data, {where: {_id: reservationId }});
}

exports.deleteReservation = (reservationId) => {
    return Reservation.destroy({
        where: { _id: reservationId }
    });
}

exports.deleteManyReservations = (reservationIds) => {
    return Reservation.find({ _id: { [Sequelize.Op.in]: reservationIds }})
}