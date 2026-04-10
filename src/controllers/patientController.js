const pool = require('../models/database');

exports.getPatientTable = (req, res) => {
    // SQL command. Names mush match name in index.js
    const sql = `
        SELECT
            p.patientID,
            p.firstName,
            p.lastName,
            p.patientPriority,
            p.conditiondesc,
            tf.lastName AS familyContact
        FROM patient p
        JOIN trusted_family tf ON p.familyID = tf.familyID
    `;

    // Query server with SQL command
    pool.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};