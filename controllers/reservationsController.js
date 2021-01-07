const GuestRepository = require('../repository/sequelize/GuestRepository');
const ReservationRepository = require('../repository/sequelize/ReservationRepository');


exports.showReservationsList = (req, res, next) => {
    res.render('pages/rezerwacje-list', {navLocation: 'reservations'});
}

exports.showAddReservationsForm = (req, res, next) => {
    
    res.render('pages/rezerwacje-form',{navLocation: "reservations"})
    res.render('pages/table-form', { navLocation: 'employment'});
        }