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


exports.getMeds = (req, res) =>{
    const sql = `
        SELECT med.medicationType AS medicationType, med.medicationID AS medicationID
        FROM medication med
        `;

    // Query server with SQL command
    pool.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
}

exports.setMedicationTable = (req, res) => {
    const { medicationName, medicationPrice, medicationTax } = req.body;

    // Run the insert
    const paymentSql = `INSERT INTO payment_system (price, tax) VALUES (?, ?)`;

    pool.query(paymentSql, [medicationPrice, medicationTax], (err, result) => {
        if (err) return res.status(500).json({error: err.message});

        pool.query("SELECT MAX(paymentID) AS maxID FROM payment_system", (err, results) => {
            const payID = (results[0].maxID || 0);

            // Run the insert
            const medicationSql = `INSERT INTO medication (medicationType, paymentID) VALUES (?, ?)`;

            pool.query(medicationSql, [medicationName, payID], (err, result) => {
                if (err) return res.status(500).json({error: err.message});
                res.json({message: "Saved successfully"});
            });
        });
    });
}