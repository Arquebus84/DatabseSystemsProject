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