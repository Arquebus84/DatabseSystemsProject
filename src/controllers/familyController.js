const pool = require('../models/database');

exports.getFamilyTable = (req, res) => {
    // SQL command. Names mush match name in index.js
    const sql = `
        SELECT tf.familyLastName AS familyName, pn.phoneNumber AS phoneNumber
        FROM trusted_family tf 
        JOIN phone_number pn
        WHERE tf.phoneNumberID = pn.numberID
    `;

    // Query server with SQL command
    pool.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

exports.getFamilies = (req, res) => {
    // SQL command. Names mush match name in index.js
    const sql = `
        SELECT tf.familyLastName AS familyName, tf.familyID AS familyID
        FROM trusted_family tf 
    `;

    // Query server with SQL command
    pool.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
}

exports.setFamilyTable = (req, res) => {
    const { familyName, phoneNumber } = req.body;

    // Run the insert
    const phoneNumSql = `INSERT INTO phone_number (phoneNumber) VALUES (?)`;

    pool.query(phoneNumSql, [phoneNumber], (err, result) => {
        if (err) return res.status(500).json({error: err.message});

        pool.query("SELECT MAX(numberID) AS maxID FROM phone_number", (err, results) => {
            const phoneID = (results[0].maxID || 0);

            // Run the insert
            const familySql = `INSERT INTO trusted_family (familyLastName, phoneNumberID) VALUES (?, ?)`;

            pool.query(familySql, [familyName, phoneID], (err, result) => {
                if (err) return res.status(500).json({error: err.message});
                res.json({message: "Saved successfully"});
            });
        });
    });
}