const express = require('express');
const router = express.Router();

const reservationApiController = require('../../api/ReservationAPI');

router.get('/', reservationApiController.getReservations);
router.get('/:reservId', reservationApiController.getReservationById);
router.post('/', reservationApiController.createReservation);
router.put('/:reservId', reservationApiController.updateReservation);
router.delete('/:reservId', reservationApiController.deleteReservation);

module.exports = router;