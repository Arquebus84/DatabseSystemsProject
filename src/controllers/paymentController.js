const pool = require('../models/database')

exports.getPaymentTable = (req, res)=>{
    const sql = `SELECT paymentID, price, tax FROM payment_system`;
    
    //Query Server with sql command
    pool.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
}