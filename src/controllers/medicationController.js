const pool = require('../models/database');

exports.getMedicationTable = (req, res) => {
    // SQL command. Names mush match name in index.js
    const sql = `
        SELECT med.medicationType AS Medication,  sys.price AS Price, sys.tax AS Tax 
        FROM medication med
        JOIN payment_system sys
        WHERE med.paymentID = sys.paymentID
    `;

    // Query server with SQL command
    pool.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};