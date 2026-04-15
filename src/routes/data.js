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
const patientMedsController = require('../controllers/patientMedsController');

router.get('/getPatientTable', patientController.getPatientTable);
router.post('/setPatientTable', patientController.setPatientTable);
router.get('/getFamilyTable', familyController.getFamilyTable);
router.get('/getRoomTable', roomController.getRoomTable);
router.get('/getPaySumTable', paySumController.getPaySumTable);

router.get('/getFacultyTable', facultyController.getFacultyTable);
router.get('/getFacultyTypes', facultyController.getFacultyTypes);
router.post('/setFacultyTable', facultyController.setFacultyTable);

router.get('/getAssignedTable', assignmentController.getAssignmentTable);

router.get('/getMedicationTable', medicationController.getMedicationTable);
router.get('/getMeds', medicationController.getMeds);

router.get('/getPaymentTable', paymentController.getPaymentTable);

router.get('/getPatientMedsTable', patientMedsController.getPatientMedsTable);
router.post('/setPatientMedsTable', patientMedsController.setPatientMedsTable);

module.exports = router;