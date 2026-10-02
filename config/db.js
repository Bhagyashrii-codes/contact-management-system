const mysql = require("mysql2");

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Inspire@22",
    database: "contact_management"
});

pool.getConnection((err, connection) => {
    if (err) {
        console.error("Database connection failed:", err);
        return;
    }

    console.log("MySQL database connected successfully!");
    connection.release();
});

module.exports = pool;