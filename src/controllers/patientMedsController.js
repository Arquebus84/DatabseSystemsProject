const pool = require('../models/database');

exports.getPatientMedsTable = (req, res) =>{
    const sql = `SELECT p.firstName AS firstName, p.lastName AS lastName, med.medicationType AS medication
        FROM patient_med pmed
        JOIN medication med
        JOIN patient p
        WHERE pmed.patientID = p.patientID AND pmed.medicationID = med.medicationID
    `;

    // Query server with SQL command
    pool.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
}