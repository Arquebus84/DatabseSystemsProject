const pool = require('../models/database');

exports.getFamilyTable = (req, res) => {
    // SQL command. Names mush match name in index.js
    const sql = `
        SELECT tf.lastName, pn.phone_number 
        FROM trusted_family tf 
        JOIN phone_number pn
        WHERE tf.phone_numberID = pn.numberID
    `;

    // Query server with SQL command
    pool.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};