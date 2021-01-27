
const TableRepository = require('../repository/sequelize/TableRepository');
const GuestRepository = require('../repository/sequelize/GuestRepository');
const ReservationRepository = require('../repository/sequelize/ReservationRepository');

 exports.showTablesList = (req, res, next) => {
     TableRepository.getTables()
     .then(tables => {
         res.render('pages/stoliki-list', {
             tables: tables,
             navLocation: 'tables'
         });
     });

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
                table: {},
                allGuests: allGuests,
                allReservations: allReservations,
                navLocation: "tables",
                formMode: "createNew",
                btnLabel: "Dodaj",
                formAction: '/tables/add',
                validationErrors: validationErrors
            });
        });
    };

    
exports.addTable = (req, res, next) => {
    const tableData = { ...req.body };
    TableRepository.createTable(tableData)
        .then(result => {
            res.redirect('/tables');
        })
        .catch(err => {
            res.render('pages/stolik-form', {
                table: tableData,
                pageTitle: 'Nowy stolik',
                formMode: 'createNew',
                btnLabel: 'Dodaj',
                formAction: '/tables/add',
                navLocation: 'tables',
                validationErrors: err.errors
            });
        });
};


exports.showTableEdit = (req, res, next) => {
    const tableId = req.params.tableId;

    const validationErrors = [];
    TableRepository.getTableById(tableId)
        .then(table => {
            res.render('pages/stolik-form', {
                table: table,
                formMode: 'edit',
                pageTitle: 'Edytuj stolik',
                btnLabel: 'Edytuj stolik',
                formAction: '/tables/edit',
                navLocation: 'tables',
                validationErrors: validationErrors
            });
        });
}

exports.showTableDetails = (req, res, next) => {
    const tableId = req.params.tableId;
    const validationErrors = [];
    TableRepository.getTableById(tableId).then(table => {
            res.render('pages/stolik-form', {
                table: table,
                formMode: 'showDetails',
                pageTitle: 'Szczegóły stolika',
                formAction: '',
                navLocation: 'tables',
                validationErrors: validationErrors
            });
        });
}


exports.updateTable = (req, res, next) => {
    const tableId = req.body._id;
    const tableData = { ...req.body };


    TableRepository.updateTable(tableId, tableData)
        .then(result => {
            res.redirect('/tables');
        })
        .catch(err => {
            TableRepository.getTableById(tableId)
                .then(tablegst => {
                    res.render('pages/stolik-form', {
                        table: tableData,
                        pageTitle: 'Edytuj stolik',
                        formMode: 'edit',
                        btnLabel: 'Edytuj',
                        formAction: '/tables/edit',
                        navLocation: 'tables',
                        validationErrors: err.errors
                    });
                });
        });


};


exports.deleteTable = (req, res, next) => {
    const tableId = req.params.tableId;
    TableRepository.deleteTable(tableId)
        .then(() => {
            res.redirect('/tables');
        });
};