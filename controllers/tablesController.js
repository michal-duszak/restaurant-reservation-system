
const TableRepository = require('../repository/sequelize/TableRepository');
const GuestRepository = require('../repository/sequelize/GuestRepository');
const ReservationRepository = require('../repository/sequelize/ReservationRepository');

 exports.showTablesList = (req, res, next) => {
     res.render('pages/stoliki-list', { navLocation: "tables"});
 }  

 exports.showAddTableForm = (req, res, next) => {
    let allGuests, allReservations;
    const validationErrors = [];
    GuestRepository.getGuests()
        .then(guests => {
            allGuests = guests;
            return ReservationRepository.getReservations();
        })
        .then(reservations => {
            allReservations = reservations;
            res.render('pages/stolik-form', {
                navLocation: "tables"
            });
        });
    };
