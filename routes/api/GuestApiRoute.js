const express = require('express');
const router = express.Router();

const guestApiController = require('../../api/GuestAPI');

router.get('/', guestApiController.getGuests);
router.get('/:guestId', guestApiController.getGuestById);
router.post('/', guestApiController.createGuest);
router.put('/:guestId', guestApiController.updateGuest);
router.delete('/:guestId', guestApiController.deleteGuest);

module.exports = router;