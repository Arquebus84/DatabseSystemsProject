const express = require('express');
const router = express.Router();

// Set up faculty controller to retrieve faculty data
const facultyController = require('../controllers/facultyController');
const patientController = require('../controllers/patientController');

router.get('/facultyTable', facultyController.getFacultyTable);
router.get('/patientTable', patientController.getPatientTable);

module.exports = router;