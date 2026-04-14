const express = require('express');
const router = express.Router();

// Set up faculty controller to retrieve faculty data
const patientController = require('../controllers/patientController');
const familyController = require('../controllers/familyController');
const roomController = require('../controllers/roomController');
const paySumController = require('../controllers/paySumController');

const facultyController = require('../controllers/facultyController');
const assignmentController = require('../controllers/assignmentController');

const medicationController = require('../controllers/medicationController');
const paymentController = require('../controllers/paymentController');

router.get('/patientTable', patientController.getPatientTable);
router.get('/familyTable', familyController.getFamilyTable);
router.get('/roomTable', roomController.getRoomTable);
router.get('/paySumTable', paySumController.getPaySumTable);

router.get('/facultyTable', facultyController.getFacultyTable);
router.get('/assignedTable', assignmentController.getAssignmentTable);

router.get('/medicationTable', medicationController.getMedicationTable);
router.get('/paymentTable', paymentController.getPaymentTable);

module.exports = router;