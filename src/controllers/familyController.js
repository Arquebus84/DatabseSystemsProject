const pool = require('../models/database');

exports.getFamilyTable = (req, res) => {
    // SQL command. Names mush match name in index.js
    const sql = `
        SELECT * FROM trusted_family
    `;

    // Query server with SQL command
    pool.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};