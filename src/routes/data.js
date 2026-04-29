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
router.post('/deletePatientTable/:patientID', patientController.deletePatientTable);

router.get('/getFamilyTable', familyController.getFamilyTable);
router.post('/setFamilyTable', familyController.setFamilyTable);
router.get('/getFamilies', familyController.getFamilies);
router.post('/deleteFamilyTable/:familyID', familyController.deleteFamilyTable);

router.get('/getRoomTable', roomController.getRoomTable);
router.post('/setRoomTable', roomController.setRoomTable);
router.post('/deleteRoomTable/:roomID', roomController.deleteRoomTable);

router.get('/getPaySumTable', paySumController.getPaySumTable);

router.get('/getFacultyTable', facultyController.getFacultyTable);
router.get('/getFacultyTypes', facultyController.getFacultyTypes);
router.post('/setFacultyTable', facultyController.setFacultyTable);
router.post('/deleteFacultyTable/:facultyID', facultyController.deleteFacultyTable);

router.get('/getAssignmentTable', assignmentController.getAssignmentTable);
router.post('/setAssignmentTable', assignmentController.setAssignmentTable);
router.post('/deleteAssignmentTable', assignmentController.deleteAssignmentTable);

router.get('/getMedicationTable', medicationController.getMedicationTable);
router.post('/setMedicationTable', medicationController.setMedicationTable);
router.post('/deleteMedTable/:medicationID', medicationController.deleteMedTable);
router.get('/getMeds', medicationController.getMeds);


router.get('/getPatientMedsTable', patientMedsController.getPatientMedsTable);
router.post('/setPatientMedsTable', patientMedsController.setPatientMedsTable);
router.post('/deletePatientMedTable', patientMedsController.deletePatientMedTable);


module.exports = router;