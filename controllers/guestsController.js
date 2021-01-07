const GuestRepository = require('../repository/sequelize/GuestRepository');


exports.showGuestsList = (req, res, next) => {
    GuestRepository.getGuests()
        .then(guests => {
            res.render('pages/guest-list', {
                guests: guests,
                navLocation: 'guests'
            });
        });
};

exports.showAddGuestForm = (req, res, next) => {
    const validationErrors = [];
    res.render('pages/guest-form', {
        guests: {},
        pageTitle: 'Dodaj gościa',
        formMode: 'createNew',
        btnLabel: "Dodaj gościa",
        formAction: '/guests/add',
        navLocation: 'guests',
        firstName: "",
        lastName: "",
        email: "",
        tel: "",
        validationErrors: validationErrors
     }); 
};  

exports.showGuestDetails = (req, res, next) => {
    const empId = req.params.empId;
    GuestRepository.getGuestById(empId).then((emp) => {
        res.render('pages/guest-form', {
            emp: emp,
            firstName: emp.firstName,
            lastName: emp.lastName,
            email: emp.email,
            tel: emp.tel,
            nip: emp.nip,
            formMode: 'showDetails',
            pageTitle: 'Szczegóły gościa',
            formAction: '',
            navLocation: 'guests'
        });
         
    })
};

// exports.showAddGuestForm = (req, res, next) => {
//     const validationErrors = [];
//     res.render('pages/guest-form', {
//         gst: {},
//         pageTitle: 'Dodaj gościa',
//         formMode: 'createNew',
//         btnLabel: "Dodaj gościa",
//         formAction: '/guests/add',
//         navLocation: 'guests',
//         firstName: "",
//         lastName: "",
//         email: "",
//         tel: "",
//         validationErrors: validationErrors
//     }); 
// };  

    exports.showEditGuestForm = (req, res, next) => {
    const empId = req.params.empId;
    GuestRepository.getGuestById(empId)
    .then(emp => {
            res.render('pages/guest-form', {
                emp: emp,
                firstName: emp.firstName,
                lastName: emp.lastName,
                email: emp.email,
                tel: emp.tel,
                nip: emp.nip,
                formMode: 'edit',
                pageTitle: 'Edycja gościa',
                btnLabel: 'Edytuj gościa',
                formAction: '/guests/edit',
                navLocation: 'guests'
            });
        });
};





  
  





exports.addGuest = (req, res, next) => {
    const guestData = { ...req.body };
    GuestRepository.createGuest(guestData)
        .then( result => {
            res.redirect('/guests');
        });
};

exports.updateGuest = (req, res, next) => {
    const empId = req.body._id;
const empData = { ...req.body };
GuestRepository.updateGuest(empId, empData)
    .then( result => {
        res.redirect('/guests');
    });
};

exports.deleteGuest = (req, res, next) => {
    const empId = req.params.empId;
GuestRepository.deleteGuest(empId)
    .then( () => {
        res.redirect('/guests');
    });
};