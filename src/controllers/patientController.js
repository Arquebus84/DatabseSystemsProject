const pool = require('../models/database');
const result = require("mysql/lib/protocol/packets/OkPacket");

exports.getPatientTable = (req, res) => {
    // SQL command. Names mush match name in index.js
    const sql = `SELECT 
        p.patientID AS ID, p.firstName AS firstName, p.lastName AS lastName, 
        p.patientPriority AS priority, p.conditionDesc AS conditionDesc, tf.familyLastName AS familyContact 
        FROM patient p 
        JOIN trusted_family tf ON p.familyID = tf.familyID`;

    // Query server with SQL command
    pool.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

exports.setPatientTable = (req, res) =>{
    const { firstName, lastName, patientPriority, conditionDesc, familyID } = req.body;

    // Run the insert
    const insertSql = `INSERT INTO patient (firstName, lastName, patientPriority, conditiondesc, familyID) VALUES (?, ?, ?, ?, ?)`;

    pool.query(insertSql, [firstName, lastName, patientPriority, conditionDesc, familyID], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Saved successfully"});
    });
};