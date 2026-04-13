const express = require('express');
const router = express.Router();

// Set up faculty controller to retrieve faculty data
const facultyController = require('../controllers/facultyController');
const patientController = require('../controllers/patientController');
const paymentController = require('../controllers/paymentController');
const paySumController = require('../controllers/paySumController');

router.get('/facultyTable', facultyController.getFacultyTable);
router.get('/patientTable', patientController.getPatientTable);
router.get('/paymentTable', paymentController.getPaymentTable);
router.get('/paySumTable', paySumController.getPaySumTable);
module.exports = router;