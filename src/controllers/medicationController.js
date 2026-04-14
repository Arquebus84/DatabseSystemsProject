const pool = require('../models/database');

exports.getMedicationTable = (req, res) => {
    // SQL command. Names mush match name in index.js
    const sql = `
        SELECT med.medicationType AS Medication, ROUND(sum(sys.price * 0.01 * sys.tax + sys.price), 2) AS Cost 
        FROM medication med
        JOIN payment_system sys
        WHERE med.priceID = sys.paymentID
        GROUP BY med.medicationType, sys.price, sys.tax;
    `;

    // Query server with SQL command
    pool.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};