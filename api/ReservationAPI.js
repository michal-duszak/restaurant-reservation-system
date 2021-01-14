const ReservationRepository = require('../repository/sequelize/ReservationRepository');

exports.getReservations = (req, res, next) => {
    ReservationRepository.getReservations()
        .then(reservs => {
            res.status(200).json(reservs);
        })
        .catch(err => {
           console.log(err);
        });
};

exports.getReservationById = (req, res, next) => {
    const reservId = req.params.reservId;
    ReservationRepository.getReservationById(reservId)
        .then(reserv => {
            if(!reserv) {
                res.status(404).json({
                    message: 'Reservation with id: '+reservId+' not found'
                })
            } else {
                res.status(200).json(reserv);
            }
        });
};

exports.createReservation = (req, res, next) => {
    ReservationRepository.createReservation(req.body)
        .then(newObj => {
           res.status(201).json(newObj);
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.updateReservation = (req, res, next) => {
    const reservId = req.params.reservId;
    ReservationRepository.updateReservation(reservId, req.body)
        .then(result => {
           res.status(200).json({message: 'Reservation updated!', reservation: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

};

exports.deleteReservation = (req, res, next) => {
    const reservId = req.params.reservId;
    ReservationRepository.deleteReservation(reservId)
        .then(result => {
            res.status(200).json({message: 'Removed reservation', reservation: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};