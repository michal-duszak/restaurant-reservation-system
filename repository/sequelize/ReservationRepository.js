const Sequelize = require('sequelize');

const Reservation = require('../../model/sequelize/Reservation');
const Guest = require('../../model/sequelize/Guest');
const Table = require('../../model/sequelize/Table');

exports.getReservations = () => {
    return Reservation.findAll({
        include: [
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


exports.getReservationById = (reservationID) => {
    return Reservation.findByPk(reservationID,
        {
            include: [
                {
                    model: Guest,
                    as: "guest"
                },
                {
                    model: Table,
                    as: "table"
                }]
        });
};

exports.createReservation = (data) => {
    

    return Reservation.create({
        orderNumber: data.orderNumber,
        date:data.date,
        time:data.time,
        numberOfGuests: data.numberOfGuests,
        guest_id: data.guest_id, 
        table_id: data.table_id,
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