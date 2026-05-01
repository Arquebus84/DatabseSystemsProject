const pool = require('../models/database');

exports.getPaySumTable = (req,res)=>{
    // const sql = `SELECT ROUND(sum(sys.price * sys.tax * 0.01 + sys.price), 2) AS netPayment, p.lastName AS patientName FROM payment_summary psum 
    //     JOIN patient p
    //     JOIN payment_system sys
    //     WHERE p.patientID = psum.patientID AND psum.paymentID = sys.paymentID
    //     GROUP BY p.lastName;
    // `;

    const sql = `SELECT ROUND(sum(sys.price * sys.tax * 0.01 + sys.price), 2) AS netPayment, p.lastName AS patientName
        FROM payment_system sys 
        JOIN patient p 
        JOIN patient_med pmed 
        JOIN medication med 
        WHERE med.paymentID = sys.paymentID AND pmed.patientID = p.patientID AND pmed.medicationID = med.medicationID
        GROUP BY p.lastName;
    `;

    //Query Server with sql command
    pool.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
}