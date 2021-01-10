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

exports.addReservationForm = (req, res, next) => {
    let allGuests, allTables;
    const validationErrors = [];
    GuestRepository.getGuests()
        .then(gsts => {
            allGuests = gsts;
            return TableRepository.getTables();
        })
        .then(tbs => {
            allTables = tbs;
            res.render('pages/rezerwacje-form', {
                reserv: {},
                reservData: {},
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

// narzedzie do debugu - nie przekazuj zadnych danych
// poza navLocation
// jesli strona odpali, dziala wszystko poza kontrolerem
// (jesli wciaz nie dziala to SPRAWDZ ASSOCIATIONS!!!)
//
// exports.addTry = (req, res, next) => {
//     res.render('pages/debug', { navLocation: "reservations"});
// }

// exports.showAddReservationForm = (req, res, next) => {
//     let allGuests, allTables;
//     const validationErrors = [];
//     GuestRepository.getGuests()
//         .then(gsts => {
//             allGuests = gsts;
//             return TableRepository.getTables();
//         })
//         .then(tbs => {
//             allTables = tbs;
//             res.render('pages/rezerwacje-list', {
//                 reservation: {},
//                 reservationData: {},
//                 formMode: 'createNew',
//                 allGuests: allGuests,
//                 allTables: allTables,
//                 pageTitle: 'New reservation',
//                 btnLabel: 'Add reservation',
//                 formAction: '/reservations/add',
//                 navLocation: 'reservations',
//                 validationErrors: validationErrors
//             });
//         });
// }

exports.showEditReservationForm = (req, res, next) => {
    const reservId = req.params.reservId;
    let allGuests, allTables;
    const validationErrors = [];

    GuestRepository.getGuests()
        .then(gsts => {
            allGuests = gsts;
            return TableRepository.getTables();
        })
        .then(tbs => {
            allTables = tbs;
            return ReservationRepository.getReservationById(reservId);

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

exports.addTry = (req, res, next) => {
    const reservId = req.params.reservId;
    let allGuests, allTables;
    const validationErrors = [];
    res.render('pages/debug', { navLocation: "reservations"});
    GuestRepository.getGuests()
        .then(gsts => {
            allGuests = gsts;
            return TableRepository.getTables();
        })
          .then(tbs => {
            allTables = tbs;
            return ReservationRepository.getReservationById(reservId);

        })
        .then(reserv => {
            res.render('debug', {
                reserv: reserv,
                reservData: reserv,
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


exports.showReservationDetails = (req, res, next) => {
    const reservId = req.params.reservId;
    let allGuests, allTables;
    const validationErrors = [];
    
    GuestRepository.getGuests()
        .then(gsts => {
            allGuests = gsts;
            console.log("UGAGUGAUBA" + reservId);
            return TableRepository.getTables();
        })
        .then(tbs => {
            allTables = tbs;
            return ReservationRepository.getReservationById(reservId);
        })
        .then(reserv => {
            console.log("UGAGUGAUBA" + reserv)
            res.render('rezerwacje-form', {
                reserv: reserv,
                reservData: reserv,
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

    const reservData = { ...req.body };
    let allGuests, allTables;

    ReservationRepository.createReservation(reservData)
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
                        reserv: {},
                        reserv: reservData,
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
    const reservId = req.body._id;
    const reservationData = { ...req.body };
    let allGuests, allTables;

    ReservationRepository.updateReservation(reservId, reservationData)
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
                    return ReservationRepository.getReservationById(reservId);

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
    const reservId = req.params.reservId;
    ReservationRepository.deleteReservation(reservId)
        .then(() => {
            res.redirect('/reservations');
        });
};