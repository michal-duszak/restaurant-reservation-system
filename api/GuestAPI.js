const GuestRepository = require('../repository/sequelize/GuestRepository');

exports.getGuests = (req, res, next) => {
    GuestRepository.getGuests()
        .then(guests => {
            res.status(200).json(guests);
        })
        .catch(err => {
           console.log(err);
        });
};

exports.getGuestById = (req, res, next) => {
    const guestId = req.params.guestId;
    GuestRepository.getGuestById(guestId)
        .then(guest => {
            if(!guest) {
                res.status(404).json({
                    message: 'Guest with id: '+guestId+' not found'
                })
            } else {
                res.status(200).json(guest);
            }
        });
};

exports.createGuest = (req, res, next) => {
    GuestRepository.createGuest(req.body)
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

exports.updateGuest = (req, res, next) => {
    const guestId = req.params.guestId;
    GuestRepository.updateGuest(guestId, req.body)
        .then(result => {
           res.status(200).json({message: 'Guest updated!', guest: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

};

exports.deleteGuest = (req, res, next) => {
    const guestId = req.params.guestId;
    GuestRepository.deleteGuest(guestId)
        .then(result => {
            res.status(200).json({message: 'Removed guest', guest: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};