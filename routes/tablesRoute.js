const express = require('express');
const router = express.Router();
const tablesController = require('../controllers/tablesController.js');
router.get('/', tablesController.showTablesList);
router.get('/add', tablesController.showAddTableForm);
//  router.get('/details/:empId', tablesController.showTableDetails);
// router.get('/edit/:empId', tablesController.showTableEdit);
module.exports = router;