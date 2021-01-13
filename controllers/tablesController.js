
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
            });
        });
    };

    
exports.addTable = (req, res, next) => {
    const tableData = { ...req.body };
    TableRepository.createTable(tableData)
        .then(result => {
            console.log("  create table START LOGA TABLE DATA " + JSON.stringify(tableData) + "KONIEC LOGA")
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
            });
        });
};


exports.showTableEdit = (req, res, next) => {
    const tableId = req.params.tableId;

    const validationErrors = [];
    TableRepository.getTableById(tableId)
        .then(table => {
            console.log("TO JEST ID I COS SIE DIZEJE" + tableId);
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
            console.log("START OF LOG" + JSON.stringify(table) + "END OF LOG");
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
