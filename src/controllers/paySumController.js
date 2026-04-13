const pool = require('../models/database');

exports.getPaySumTable = (req,res)=>{
    const sql = `SELECT sum(psys.price * psys.tax * 0.01 + psys.price) AS netPayment, pat.lastName AS patientName FROM payment_summary psum 
        JOIN payment_system psys 
        JOIN patient pat 
        where psum.paymentID = psys.paymentID AND psum.patientID = pat.patientID GROUP BY pat.lastName;
    `;

    //Query Server with sql command
    pool.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
}