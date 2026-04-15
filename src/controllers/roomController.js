const pool = require('../models/database');

exports.getRoomTable = (req, res) => {
    // SQL command. Names mush match name in index.js
    const sql = `
        SELECT r.patientRoomNumber AS roomNumber, p.firstName AS firstName, p.lastName AS lastName 
        FROM patient_room r 
        JOIN patient p WHERE r.patientID = p.patientID
    `;

    // Query server with SQL command
    pool.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};