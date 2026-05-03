const pool = require('../models/database');

exports.getMedicationTable = (req, res) => {
    // SQL command. Names mush match name in index.js
    const sql = `
        SELECT med.medicationID AS ID, med.medicationType AS Medication, sys.price AS Price, sys.tax AS Tax, sys.paymentID AS payID
        FROM medication med
                 JOIN payment_system sys
        WHERE med.paymentID = sys.paymentID
    `;

    // Query server with SQL command
    pool.query(sql, (err, results) => {
        if (err) return res.status(500).json({error: err.message});
        res.json(results);
    });
};


exports.getMeds = (req, res) => {
    const sql = `
        SELECT med.medicationType AS medicationType, med.medicationID AS medicationID
        FROM medication med
    `;

    // Query server with SQL command
    pool.query(sql, (err, results) => {
        if (err) return res.status(500).json({error: err.message});
        res.json(results);
    });
}

exports.setMedicationTable = (req, res) => {
    const {medicationName, medicationPrice, medicationTax} = req.body;

    // Run the insert
    const paymentSql = `INSERT INTO payment_system (price, tax)
                        VALUES (?, ?)`;

    pool.query(paymentSql, [medicationPrice, medicationTax], (err, result) => {
        if (err) return res.status(500).json({error: err.message});

        const newPayID = result.insertId;

        // Run the insert
        const medicationSql = `INSERT INTO medication (medicationType, paymentID)
                               VALUES (?, ?)`;

        pool.query(medicationSql, [medicationName, newPayID], (err, result) => {
            if (err) return res.status(500).json({error: err.message});
            res.json({message: "Saved successfully"});
        });
    });
}

exports.deleteMedTable = (req, res) =>{
    const { medicationID } = req.params;

    // Run the insert
    const deleteSql = `DELETE FROM medication WHERE medicationID = ?`;

    pool.query(deleteSql, [medicationID], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Saved successfully"});
    });
};

exports.updateMedicationTable = (req, res) => {
    const {medicationID, paymentID, medicationName, medicationPrice, medicationTax} = req.body;

    // Run the insert
    const paymentSql = `UPDATE payment_system SET price = ?, tax = ? WHERE paymentID = ?`;

    pool.query(paymentSql, [medicationPrice, medicationTax, paymentID], (err, result) => {
        if (err) return res.status(500).json({error: err.message});

        // Run the insert
        const medicationSql = `UPDATE medication SET medicationType = ? WHERE medicationID = ?`;

        pool.query(medicationSql, [medicationName, medicationID], (err, result) => {
            if (err) return res.status(500).json({error: err.message});
            res.json({message: "Saved successfully"});
        });
    });
}