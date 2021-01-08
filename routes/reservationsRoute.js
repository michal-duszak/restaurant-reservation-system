const express = require('express');
const router = express.Router();

const reservationController = require('../controllers/reservationsController');

router.get('/', reservationController.showReservationList);
router.get('/add', reservationController.showAddReservationForm);
router.get('/edit/:reservationId', reservationController.showEditReservationForm);
router.get('/details/:reservationId', reservationController.showReservationDetails);

router.post('/add', reservationController.addReservation);
router.post('/edit', reservationController.updateReservation);
router.get('/delete/:reservationId', reservationController.deleteReservation);

module.exports = router;