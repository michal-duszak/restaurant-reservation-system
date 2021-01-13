const express = require('express');
const router = express.Router();

const reservationController = require('../controllers/reservationsController');

router.get('/', reservationController.showReservationList);
// router.get('/add', reservationController.showAddReservationForm);
router.get('/add', reservationController.addReservationForm);
router.get('/edit/:reservId', reservationController.showEditReservationForm);
router.get('/details/:reservId', reservationController.showReservationDetails);

//router.get('/details/:reservId', reservationController.showReservationDetails);

router.post('/add', reservationController.addReservation);
router.post('/edit', reservationController.updateReservation);
router.get('/delete/:reservId', reservationController.deleteReservation);
module.exports = router;