const express = require('express');
const router = express.Router();
const reservationsController = require('../controllers/reservationsController.js');
router.get('/', reservationsController.showReservationsList);
router.get('/add', reservationsController.showAddReservationsForm);
// router.get('/details/:empId', guestsControler.showGuestsDetails);
module.exports = router;