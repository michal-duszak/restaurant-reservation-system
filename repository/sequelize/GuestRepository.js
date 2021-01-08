const Guest = require("../../model/sequelize/Guest");
const Reservation = require("../../model/sequelize/Reservation");
const Table = require("../../model/sequelize/Table");

exports.getGuests = () => {
   // console.log(Guest.findAll());
    return Guest.findAll();
};

exports.getGuestById = (empId) => {
    console.log(Guest.findByPk(empId));
    return Guest.findByPk(empId,    
        {
            include: [{
                model: Table,
                as: 'tables',
                include: [{
                    model: Reservation,
                    as: 'reservations'
                }]
            }]
        });
};

exports.createGuest = (newEmpData) => {
    return Guest.create({
        firstName: newEmpData.firstName,
        lastName: newEmpData.lastName,
        email: newEmpData.email,
        tel: newEmpData.tel,
        nip: newEmpData.nip
    });
};

exports.updateGuest = (guestId, guestData) => {
    const firstName = guestData.firstName;
    const lastName = guestData.lastName;
    const email = guestData.email;
    const tel = guestData.tel;
    const nip = guestData.nip;
    return Guest.update(guestData, {where: {_id: guestId }});
};

exports.deleteGuest = (empId) => {
    return Guest.destroy({
        where: { _id: empId }
    });

}; 