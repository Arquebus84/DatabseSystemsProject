const pool = require('../models/database');

exports.getPatientMedsTable = (req, res) =>{
    const sql = `SELECT p.firstName AS firstName, p.lastName AS lastName, med.medicationType 
    FROM patient p
    JOIN patient_med pmed
    JOIN medication med
    JOIN payment_system sys
    WHERE med.priceID = sys.paymentID AND p.patientID = pmed.patientID;`;

    // Query server with SQL command
    pool.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
}