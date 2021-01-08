
const express = require('express');
const router = express.Router();

const guestController = require('../controllers/guestsController.js');

router.get('/', guestController.showGuestList);
router.get('/add', guestController.showAddGuestForm);
router.get('/edit/:gstId', guestController.showEditGuestForm);
router.get('/details/:gstId', guestController.showGuestDetails);

router.post('/add', guestController.addGuest);
router.post('/edit', guestController.updateGuest);
router.get('/delete/:gstId', guestController.deleteGuest);

module.exports = router;