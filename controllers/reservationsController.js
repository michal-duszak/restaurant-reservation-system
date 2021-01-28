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
                pageTitle: 'Nowa rezerwacja',
                btnLabel: 'Dodaj rezerwację',
                formAction: '/reservations/add',
                navLocation: 'reservations',
                validationErrors: validationErrors
                });
        });
    
}



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
        .then(reserv => {
            res.render('pages/rezerwacje-form', {
                reserv: reserv,
                reservData: reserv,
                formMode: 'edit',
                allGuests: allGuests,
                allTables: allTables,
                pageTitle: 'Edytuj rezerwację',
                btnLabel: 'Edytuj rezerwację',
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
                pageTitle: 'Szczegóły rezerwacji',
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
            return TableRepository.getTables();
        })
        .then(tbs => {
            allTables = tbs;
            return ReservationRepository.getReservationById(reservId);
        })
        .then(reserv => {
            res.render('pages/rezerwacje-form', {
                reserv: reserv,
                reservData: reserv,
                formMode: 'showDetails',
                allGuests: allGuests,
                allTables: allTables,
                pageTitle: 'Szczegóły rezerwacji',
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
                        pageTitle: 'Nowa rezerwacja',
                        btnLabel: 'Dodaj rezerwację',
                        formAction: '/reservations/add',
                        navLocation: 'reservations',
                        validationErrors: err.errors
                    });

                });

        });
};

exports.updateReservation = (req, res, next) => {
    const reservId = req.body._id;
    const reservData = { ...req.body };
    let allGuests, allTables;

    ReservationRepository.updateReservation(reservId, reservData)
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
                        reserv: reservData,
                        formMode: 'edit',
                        allGuests: allGuests,
                        allTables: allTables,
                        pageTitle: 'Edytuj rezerwacje',
                        btnLabel: 'Edytuj',
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