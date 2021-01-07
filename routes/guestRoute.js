const express = require('express');
const router = express.Router();
const guestsControler = require('../controllers/guestsController.js');
router.get('/', guestsControler.showGuestsList);
router.get('/add',  guestsControler.showAddGuestForm);
router.get('/edit/:empId', guestsControler.showEditGuestForm);
router.get('/details/:empId', guestsControler.showGuestDetails);
router.post('/add', guestsControler.addGuest); 
router.post('/edit', guestsControler.updateGuest);
router.get('/delete/:empId', guestsControler.deleteGuest);
// router.get('/', guestsControler.showGuestList);
// router.get('/add', guestsControler.showAddGuestForm);

// router.get('/details/:empId', guestsControler.showGuestDetails);
module.exports = router;

