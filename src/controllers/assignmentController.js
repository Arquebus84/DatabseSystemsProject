const pool = require('../models/database');
const result = require("mysql/lib/protocol/packets/OkPacket");

exports.getAssignmentTable = (req, res) => {
    // SQL command. Names mush match name in index.js
    const sql = `
        select f.facultyLastName AS facultyName, p.firstName AS firstName, p.lastName AS lastName, pr.patientRoomNumber AS roomNum,
        case
            when (pr.patientRoomNumber >= 3000) then ifnull(ar.floorNumber, 3)
            when (pr.patientRoomNumber >= 2000) then ifnull(ar.floorNumber, 2)
            else ifnull(ar.floorNumber, 1)
        end AS FloorNumber
        from assigned_room ar
        join patient_room pr
        join patient p
        join faculty f
        where ar.patientRoomID = pr.patientRoomID AND ar.facultyID = f.facultyID AND pr.patientID = p.patientID
        `;

    // Query server with SQL command
    pool.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

exports.setAssignmentTable = (req, res) => {
    const { patientID, facultyID, floorNumber } = req.body;

    // Find the patient's room ID using parameterized queries
    const getPatientRoomSql = `
        SELECT pr.patientRoomID 
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

        // Run the insert with the required floorNumber
        const insertSql = `
            INSERT INTO assigned_room (patientRoomID, facultyID)
            VALUES (?, ?, ?)`;

        pool.query(insertSql, [patientRoomID, facultyID, floorNumber], (err, result) => {
            if (err) {
                // Handle the UNIQUE constraint if this room/faculty combo already exists
                return res.status(500).json({ error: "Assignment already exists or invalid data" });
            }
            res.json({ message: "Staff member assigned to room successfully"});
        });
    });
};