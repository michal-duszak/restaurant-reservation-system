const ReservationRepository = require('../repository/sequelize/ReservationRepository');
const TableRepository = require('../repository/sequelize/TableRepository');
const GuestRepository = require('../repository/sequelize/GuestRepository');

exports.showReservationList = (req, res, next) => {
    ReservationRepository.getReservations()
        .then(reservations => {
            res.render('pages/rezerwacje-list', {
                reservations: reservations,
                navLocation: 'reservations'
            });
        });
}
exports.showAddReservationForm = (req, res, next) => {
    let allGuests, allTables;
    const validationErrors = [];
    GuestRepository.getGuests()
        .then(gsts => {
            allGuests = gsts;
            return TableRepository.getTables();
        })
        .then(tbs => {
            allTables = tbs;
            res.render('pages/rezerwacje-list', {
                reservation: {},
                reservationData: {},
                formMode: 'createNew',
                allGuests: allGuests,
                allTables: allTables,
                pageTitle: 'New reservation',
                btnLabel: 'Add reservation',
                formAction: '/reservations/add',
                navLocation: 'reservations',
                validationErrors: validationErrors
            });
        });
}

exports.showEditReservationForm = (req, res, next) => {
    const reservationId = req.params.reservationId;
    let allGuests, allTables;
    const validationErrors = [];

    GuestRepository.getGuests()
        .then(gsts => {
            allGuests = gsts;
            return TableRepository.getTables();
        })
        .then(tbs => {
            allTables = tbs;
            return ReservationRepository.getReservationById(reservationId);

        })
        .then(reservation => {
            res.render('pages/rezerwacje-form', {
                reservation: reservation,
                reservationData: reservation,
                formMode: 'edit',
                allGuests: allGuests,
                allTables: allTables,
                pageTitle: 'Edit reservation',
                btnLabel: 'Edit reservation',
                formAction: '/reservations/edit',
                navLocation: 'reservations',
                validationErrors: validationErrors
            });
        });
}


exports.showReservationDetails = (req, res, next) => {
    const reservationId = req.params.reservationId;
    let allGuests, allTables;
    const validationErrors = [];

    GuestRepository.getGuests()
        .then(gsts => {
            allGuests = gsts;
            return TableRepository.getTables();
        })
        .then(tbs => {
            allTables = tbs;
            return ReservationRepository.getReservationById(reservationId);

        })
        .then(reservation => {
            res.render('pages/rezerwacje-form', {
                reservation: reservation,
                reservationData: reservation,
                formMode: 'showDetails',
                allGuests: allGuests,
                allTables: allTables,
                pageTitle: 'Reservation details',
                formAction: '',
                navLocation: 'reservations',
                validationErrors: validationErrors
            });
        });
}


exports.addReservation = (req, res, next) => {

    const reservationData = { ...req.body };
    let allGuests, allTables;

    ReservationRepository.createReservation(reservationData)
        .then(result => {
            res.redirect('/reservations');
        })
        .catch(err => {
            GuestRepository.getGuests()
                .then(gsts => {
                    allGuests = gsts;
                    return TableRepository.getTables();
                })
                .then(tbs => {
                    allTables = tbs;
                    res.render('pages/rezerwacje-form', {
                        reservation: {},
                        reservationData: reservationData,
                        formMode: 'createNew',
                        allGuests: allGuests,
                        allTables: allTables,
                        pageTitle: 'New reservation',
                        btnLabel: 'Add reservation',
                        formAction: '/reservations/add',
                        navLocation: 'reservations',
                        validationErrors: err.errors
                    });

                });

        });
};

exports.updateReservation = (req, res, next) => {
    const reservationId = req.body._id;
    const reservationData = { ...req.body };
    let allGuests, allTables;

    ReservationRepository.updateReservation(reservationId, reservationData)
        .then(result => {
            res.redirect('/reservations');
        })
        .catch(err => {
            GuestRepository.getGuests()
                .then(gsts => {
                    allGuests = gsts;
                    return TableRepository.getTables();
                })
                .then(tbs => {
                    allTables = tbs;
                    return ReservationRepository.getReservationById(reservationId);

                }).then(reservation => {
                    res.render('pages/rezerwacje-form', {
                        reservation: reservation,
                        formMode: 'edit',
                        allGuests: allGuests,
                        allTables: allTables,
                        pageTitle: 'Edit reservation',
                        btnLabel: 'Edit reservation',
                        formAction: '/reservations/edit',
                        navLocation: 'reservations',
                        validationErrors: err.errors
                    });
                });
        });
};

exports.deleteReservation = (req, res, next) => {
    const reservationId = req.params.reservationId;
    ReservationRepository.deleteReservation(reservationId)
        .then(() => {
            res.redirect('/reservations');
        });
};