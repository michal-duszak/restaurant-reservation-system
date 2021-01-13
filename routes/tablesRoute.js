const express = require('express');
const router = express.Router();
const tablesController = require('../controllers/tablesController.js');
router.get('/', tablesController.showTablesList);
router.get('/add', tablesController.showAddTableForm);
router.post('/add', tablesController.addTable);
  router.get('/details/:tableId', tablesController.showTableDetails);
 router.get('/edit/:tableId', tablesController.showTableEdit);
module.exports = router;