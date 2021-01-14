const GuestRepository = require('../repository/sequelize/GuestRepository');

exports.showGuestList = (req, res, next) => {
    GuestRepository.getGuests()
        .then(guests => {
            res.render('pages/guest-list', {
                guests: guests,
                navLocation: 'guests'
            });
        });
}

exports.showAddGuestForm = (req, res, next) => {
    const validationErrors = [];
    res.render('pages/guest-form', {
        gst: {},
        pageTitle: 'Nowy gość',
        formMode: 'createNew',
        btnLabel: 'Dodaj gościa',
        formAction: '/guests/add',
        navLocation: 'guests',
        validationErrors: validationErrors

    });
}


exports.showEditGuestForm = (req, res, next) => {
    const gstId = req.params.gstId;

    const validationErrors = [];
    GuestRepository.getGuestById(gstId)
        .then(gst => {
            res.render('pages/guest-form', {
                gst: gst,
                gstReservations: gst.reservations,
                formMode: 'edit',
                pageTitle: 'Edytuj gościa',
                btnLabel: 'Edytuj gościa',
                formAction: '/guests/edit',
                navLocation: 'guests',
                validationErrors: validationErrors
            });
        });
}

exports.showGuestDetails = (req, res, next) => {
    const gstId = req.params.gstId;
    const validationErrors = [];
    GuestRepository.getGuestById(gstId).then(gst => {
            res.render('pages/guest-form', {
                gst: gst,
                formMode: 'showDetails',
                pageTitle: 'Szczegóły gościa',
                formAction: '',
                navLocation: 'guests',
                validationErrors: validationErrors
            });
        });
}

exports.addGuest = (req, res, next) => {
    const gstData = { ...req.body };

    GuestRepository.createGuest(gstData)
        .then(result => {
            res.redirect('/guests');
        })
        .catch(err => {
            err.errors.forEach(e => {
                if (e.path.includes('email') && e.type == 'unique violation') {
                    e.message = "Adres email już istnieje!";
                }
            });
            res.render('pages/guest-form', {
                gst: gstData,
                pageTitle: 'Nowy gość',
                formMode: 'createNew',
                btnLabel: 'Dodaj gościa',
                formAction: '/guests/add',
                navLocation: 'guests',
                validationErrors: err.errors
            });
        });
};

exports.updateGuest = (req, res, next) => {
    const gstId = req.body._id;
    const gstData = { ...req.body };


    GuestRepository.updateGuest(gstId, gstData)
        .then(result => {
            res.redirect('/guests');
        })
        .catch(err => {
            err.errors.forEach(e => {
                if (e.path.includes('email') && e.type == 'unique violation') {
                    e.message = "Adres email już istnieje!";
                }
            });

            GuestRepository.getGuestById(gstId)
                .then(gst => {
                    res.render('pages/guest-form', {
                        gst: gstData,
                        gstReservations: gst.reservations,
                        pageTitle: 'Edytuj gościa',
                        formMode: 'edit',
                        btnLabel: 'Edytuj gościa',
                        formAction: '/guests/edit',
                        navLocation: 'guests',
                        validationErrors: err.errors
                    });
                });
        });


};

exports.deleteGuest = (req, res, next) => {
    const gstId = req.params.gstId;
    GuestRepository.deleteGuest(gstId)
        .then(() => {
            res.redirect('/guests');
        });
};