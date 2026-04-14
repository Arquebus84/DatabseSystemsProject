const pool = require('../models/database');

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
    
};