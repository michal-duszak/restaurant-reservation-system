const Guest = require("../../model/sequelize/Guest");
const Reservation = require("../../model/sequelize/Reservation");
const Table = require("../../model/sequelize/Table");

exports.getGuests = () => {
   // console.log(Guest.findAll());
    return Guest.findAll();
};

exports.getGuestById = (guestId) => {
   // console.log(Guest.findByPk(empId));
    return Guest.findByPk(guestId,    
        {
            include: [{
                model: Reservation,
                as: 'reservations',
                include: [{
                    model: Table,
                    as: 'table'
                }]
            }]
        });
};

exports.createGuest = (newGuestData) => {
    return Guest.create({
        firstName: newGuestData.firstName,
        lastName: newGuestData.lastName,
        email: newGuestData.email,
        tel: newGuestData.tel,
    });
};

exports.updateGuest = (guestId, guestData) => {
    return Guest.update(guestData, {where: {_id: guestId }});
};

exports.deleteGuest = (guestId) => {
    return Guest.destroy({
        where: { _id: guestId }
    });

}; 