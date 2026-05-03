const pool = require('../models/database');

exports.getRoomTable = (req, res) => {
    // SQL command. Names mush match name in index.js
    const sql = `
        SELECT r.patientRoomID AS ID, r.patientRoomNumber AS roomNumber, p.firstName AS firstName, p.lastName AS lastName 
        FROM patient_room r 
        JOIN patient p WHERE r.patientID = p.patientID
    `;

    // Query server with SQL command
    pool.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

exports.setRoomTable = (req, res) =>{
    const { roomNum, patientID } = req.body;

    // Run the insert
    const insertSql = `INSERT INTO patient_room (patientRoomNumber, patientID) VALUES (?, ?)`;

    pool.query(insertSql, [roomNum, patientID], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Saved successfully"});
    });
};

exports.deleteRoomTable = (req, res) =>{
    const { roomID } = req.params;

    // Run the insert
    const deleteSql = `DELETE FROM patient_room WHERE patientRoomID = ?`;

    pool.query(deleteSql, [roomID], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Saved successfully"});
    });
};

exports.updateRoomTable = (req, res) =>{
    const { roomID, roomNum, patientID } = req.body;

    // Run the insert
    const insertSql = `UPDATE patient_room SET patientRoomNumber = ?, patientID = ? WHERE patientRoomID = ?`;

    pool.query(insertSql, [roomNum, patientID, roomID], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Saved successfully"});
    });
};