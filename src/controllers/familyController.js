const pool = require('../models/database');

exports.getFamilyTable = (req, res) => {
    // SQL command. Names mush match name in index.js
    const sql = `
        SELECT tf.familyID AS FamilyID, tf.familyLastName AS FamilyLastName, pn.phoneNumber AS PhoneNumber
        FROM trusted_family tf 
        JOIN phone_number pn
        WHERE tf.phoneNumberID = pn.numberID
    `;

    // Query server with SQL command
    pool.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

exports.setFamilyTable = (req, res) =>{
    const { FamilyLastName, PhoneNumber } = req.body;

    // Run the insert
    const insertSql = `INSERT INTO family (familyLastName, phoneNumber) VALUES (?, ?, ?, ?, ?)`;

    pool.query(insertSql, [FamilyLastName, PhoneNumber], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Saved successfully"});
    });
};