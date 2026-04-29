const pool = require('../models/database');

exports.getFacultyTable = (req, res) => {
    // SQL command. Names mush match name in index.js
    const sql = `
        SELECT f.facultyID, f.facultyLastName, ft.facultyType 
        FROM faculty f 
        JOIN faculty_type ft ON f.facultyTypeID = ft.facultyTypeID
    `;

    // Query server with SQL command
    pool.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

exports.setFacultyTable = (req, res) =>{
    const { facultyLastName, facultyTypeID } = req.body

    // Run the insert
    const insertSql = `INSERT INTO faculty (facultyLastName, facultyTypeID) VALUES (?, ?)`;

    pool.query(insertSql, [facultyLastName, facultyTypeID], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Saved successfully"});
    });
};

exports.getFacultyTypes = (req, res) => {
    // SQL command. Names mush match name in index.js
    const sql = `
        SELECT ft.facultyTypeID, ft.facultyType
        FROM faculty_type ft
    `;

    // Query server with SQL command
    pool.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

exports.deleteFacultyTable = (req, res) =>{
    const { facultyID } = req.params;

    // Run the insert
    const deleteSql = `DELETE FROM faculty WHERE facultyID = ?`;

    pool.query(deleteSql, [facultyID], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Saved successfully"});
    });
};