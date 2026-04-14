const pool = require('../models/database');

exports.getMedicationTable = (req, res) => {
    // SQL command. Names mush match name in index.js
    const sql = `
        SELECT * FROM medication;
    `;

    // Query server with SQL command
    pool.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};