const pool = require('../models/database');
const result = require("mysql/lib/protocol/packets/OkPacket");

exports.getAssignmentTable = (req, res) => {
    // SQL command. Names mush match name in index.js
    const sql = `
        SELECT
            a.patientRoomID AS patientRoomID,
            a.facultyID AS facultyID,
            pr.patientRoomNumber AS roomNum,
            p.firstName AS firstName,
            p.lastName AS lastName,
            f.facultyLastName AS facultyName
        FROM assigned_room a
        JOIN patient_room pr ON a.patientRoomID = pr.patientRoomID
        JOIN patient p ON pr.patientID = p.patientID
        JOIN faculty f ON a.facultyID = f.facultyID
    `;

    // Query server with SQL command
    pool.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

exports.setAssignmentTable = (req, res) => {
    const { patientID, facultyID } = req.body;

    // Find the patient's room ID using parameterized queries
    const getPatientRoomSql = `
        SELECT pr.patientRoomID, pr.patientRoomNumber
        FROM patient_room pr
        WHERE pr.patientID = ?`;

    pool.query(getPatientRoomSql, [patientID], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        // Check if the patient actually has a room assigned yet
        if (results.length === 0) {
            return res.status(404).json({ error: "No room found for this patient" });
        }

        // Extract the actual ID value from the row object
        const patientRoomID = results[0].patientRoomID;
        const roomFloorNumber = (results[0].patientRoomNumber - (results[0].patientRoomNumber % 1000)) / 1000;

        // Run the insert with the required floorNumber
        const insertSql = `
            INSERT INTO assigned_room (patientRoomID, facultyID, floorNumber)
            VALUES (?, ?, ?)`;

        pool.query(insertSql, [patientRoomID, facultyID, roomFloorNumber], (err, result) => {
            if (err) {
                // Handle the UNIQUE constraint if this room/faculty combo already exists
                return res.status(500).json({ error: "Assignment already exists or invalid data" });
            }
            res.json({ message: "Staff member assigned to room successfully"});
        });
    });
};

exports.deleteAssignmentTable = (req, res) =>{
    const { patientRoomID, facultyID } = req.body;

    // Run the insert
    const deleteSql = `DELETE FROM assigned_room WHERE patientRoomID = ? AND facultyID = ?`;

    pool.query(deleteSql, [patientRoomID, facultyID], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Saved successfully"});
    });
};