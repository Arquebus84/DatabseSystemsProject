const pool = require('../models/database');

exports.getFamilyTable = (req, res) => {
    // SQL command. Names mush match name in index.js
    const sql = `
        SELECT tf.familyID AS ID, tf.familyLastName AS familyName, pn.phoneNumber AS phoneNumber, pn.numberID AS phoneID
        FROM trusted_family tf
                 JOIN phone_number pn
        WHERE tf.phoneNumberID = pn.numberID
    `;

    // Query server with SQL command
    pool.query(sql, (err, results) => {
        if (err) return res.status(500).json({error: err.message});
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
        if (err) return res.status(500).json({error: err.message});
        res.json(results);
    });
}

exports.setFamilyTable = (req, res) => {
    const {familyName, phoneNumber} = req.body;

    // Run the insert
    const phoneNumSql = `INSERT INTO phone_number (phoneNumber)
                         VALUES (?)`;

    pool.query(phoneNumSql, [phoneNumber], (err, result) => {
        if (err) return res.status(500).json({error: err.message});

        const newPhoneID = result.insertId;
        // Run the insert
        const familySql = `INSERT INTO trusted_family (familyLastName, phoneNumberID)
                           VALUES (?, ?)`;

        pool.query(familySql, [familyName, newPhoneID], (err, result) => {
            if (err) return res.status(500).json({error: err.message});
            res.json({message: "Saved successfully"});
        });
    });
}

exports.deleteFamilyTable = (req, res) =>{
    const { familyID } = req.params;

    // Run the insert
    const deleteSql = `DELETE FROM trusted_family WHERE familyID = ?`;

    pool.query(deleteSql, [familyID], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Saved successfully"});
    });
};

exports.updateFamilyTable = (req, res) => {
    const {familyID, phoneID, familyName, phoneNumber} = req.body;

    // Run the insert
    const phoneNumSql = `UPDATE phone_number SET phoneNumber = ? WHERE numberID = ?`;

    pool.query(phoneNumSql, [phoneNumber, phoneID], (err, result) => {
        if (err) return res.status(500).json({error: err.message});

        // Run the insert
        const familySql = `UPDATE trusted_family SET familyLastName = ? WHERE familyID = ?`;

        pool.query(familySql, [familyName, familyID], (err, result) => {
            if (err) return res.status(500).json({error: err.message});
            res.json({message: "Saved successfully"});
        });
    });
}
