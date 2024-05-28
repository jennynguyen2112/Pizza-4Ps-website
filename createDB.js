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
        email TEXT,
        password TEXT
    )`, (err) => {
        if (err) {
            console.error('Unexpected Error:', err);
        } else {
            console.log('Users table created successfully');
        }
    });

    db.run(`INSERT INTO usersDB (email, password) VALUES
        ('jenny@gmail.com','12345'),
        ('michael@gmail.com','54321')
    `, (err) => {
        if (err) {
            console.error('Error inserting data into usersDB:', err);
        } else {
            console.log('Sample data inserted into usersDB successfully');
        }
    });
});
db.close(); 