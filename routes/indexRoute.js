const express = require('express');
const router = express.Router();
router.get('/', (req, res, next) => {
    res.render('index', {navLocation: 'index'});
});

module.exports = router;