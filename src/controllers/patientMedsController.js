const pool = require('../models/database');

exports.getPatientMedsTable = (req, res) =>{
    const sql = `SELECT pmed.patientID AS patientID, pmed.medicationID AS medicationID, p.firstName AS firstName, p.lastName AS lastName, med.medicationType AS medication
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

exports.setPatientMedsTable = (req, res) =>{
    const { patientID, medicationID } = req.body;

    // Run the insert
    const insertSql = `INSERT INTO patient_med (patientID, medicationID) VALUES (?, ?)`;

    pool.query(insertSql, [patientID, medicationID], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Saved successfully"});
    });
};

exports.deletePatientMedTable = (req, res) =>{
    const { patientID, medicationID } = req.body;

    // Run the insert
    const deleteSql = `DELETE FROM patient_med WHERE patientID = ? AND medicationID = ?`;

    pool.query(deleteSql, [patientID, medicationID], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Saved successfully"});
    });
};