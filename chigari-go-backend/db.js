const mysql = require('mysql');

// Create connection
const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "chigari"
});

// Connect to MySQL
db.connect(err => {
    if (err) {
        console.error("Database connection failed: " + err.stack);
        return;
    }
    console.log("Connected to database.");
});

module.exports = db; // Export the db object
