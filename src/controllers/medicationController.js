const pool = require('../models/database');

exports.getMedicationTable = (req, res) => {
    // SQL command. Names mush match name in index.js
    const sql = `
        SELECT med.medicationType AS Medication, sys.price AS Price, sys.tax AS Tax 
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

exports.getMeds = (req, res)=>{
    // SQL command. Names mush match name in index.js
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
    const paymentSql = `INSERT IGNORE INTO payment_system (price, tax) VALUES (?, ?)`;

    const retrievePaymentIndex = `SELECT paymentID FROM payment_system sys WHERE sys.price = ? AND sys.tax = ?`

    pool.query(retrievePaymentIndex, [medicationPrice, medicationTax], (error, result)=>{
        if(error) return result.status(500).json({error: error.message});

        console.log(result);    //Check if the paymentID corresponds to the select
    });
    //Disabled for testing

    // pool.query(paymentSql, [medicationPrice, medicationTax], (err, result) => {
    //     if (err) return res.status(500).json({error: err.message});

    //     pool.query("SELECT MAX(paymentID) AS maxID FROM payment_system", (err, results) => {
    //         const payID = (results[0].maxID || 0);

    //         // Run the insert
    //         const medicationSql = `INSERT INTO medication (medicationType, paymentID) VALUES (?, ?)`;

    //         pool.query(medicationSql, [medicationName, payID], (err, result) => {
    //             if (err) return res.status(500).json({error: err.message});
    //             res.json({message: "Saved successfully"});
    //         });
    //     });
    // });
}