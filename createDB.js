let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./database.db'); // file database

// Handle database connection errors
db.on('error', (err) => {
    console.error('Database error:', err);
});

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS reservationDB (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstname TEXT,
        lastname TEXT,
        email TEXT,
        mobile TEXT,
        restaurant TEXT,
        guestsnumber TEXT,
        date TEXT,
        time TEXT,
        notes TEXT
    )`, (err) => {
        if (err) {
            console.error('Unexpected Error:', err);
        } else {
            console.log('Reservation table created successfully');
        }
    });

    db.run(`CREATE TABLE IF NOT EXISTS usersDB (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT,
        password TEXT
    )`, (err) => {
        if (err) {
            console.error('Unexpected Error:', err);
        } else {
            console.log('Users table created successfully');
        }
    });
});
db.close(); 
