let express = require('express');
let app = express();
let path = require('path');
let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./database.db');
let bcrypt = require('bcrypt');
let { findMenuItems } = require('./mongoDB'); 


let PORT = process.env.PORT || 3000;


// Run the table creation script
require('./createDB.js');

//Here we are configuring express to use body-parser as middle-ware.
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));



app.get('/', (req, res) => {
    res.render('signin');
});

app.get('/home', (req, res) => {
    res.render('home');
});

app.get('/reservation', (req, res) => {
    res.render('reservation');
});

app.get('/menu', (req, res) => {
    res.render('menu');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/signin', (req, res) => {
    res.render('signin');
});
app.get('/signup', (req, res) => {
    res.render('signup');
});
app.get('/thankyou', (req, res) => {
    res.render('thankyou');
});
app.get('/menu-search', (req, res) => {
    res.render('thankyou');
});
app.post('/signin', (req, res) =>{
    const {username, password} = req.body;
    if (username && password){
        db.get('SELECT * FROM usersDB WHERE username = ?',
        [username],(err, user) => {
            if(err) throw err;
            if (user)  {
                console.log(`User found: ${user.username}, Hashed Password: ${user.password}`);
                bcrypt.compare(password, user.password, (err, result)=>{
                    if(err) throw err;
                    console.log(`Password comparison result: ${result}`);
                    if (result) {
                        res.redirect('/home');
                    }else {
                        res.send('Incorrect Details')
                    }
                });
            } else {
                res.send('Incorrect Login Details')
            }
        });
    } else {
        res.send('Please Enter Login Details');
    }
});
app.post('/signup', async (req, res) =>{
    const {username, password} = req.body
    const hash = await bcrypt.hash(password,13)
    console.log(`Data to be inserted: ${username}, ${hash}`);
    db.run('INSERT INTO usersDB (username, password) VALUES (?, ?)',
    [username, hash], (err) =>{
    if (err) {
        console.error('Error inserting data:', err.message);
    }
    res.redirect('/thankyou');
    });
});


app.post('/reservation-info', (req, res) => {
    console.log('Received reservation from customer');
    console.log('Request body:', req.body);
    let { firstname, lastname, email, mobile, restaurant, guestsnumber, date, time, notes } = req.body;
    console.log(`Data to be inserted: ${firstname}, ${lastname}, ${email}, ${mobile}, ${restaurant}, ${guestsnumber}, ${date}, ${time}, ${notes}`);
    // Validate that none of the fields are undefined or empty
    if (!firstname || !lastname || !email || !mobile || !restaurant || !guestsnumber || !date || !time) {
        console.error('Error: Missing fields in the reservation data');
        res.status(400).send('Bad Request: Missing fields in the reservation data');
        return;
    }
    db.run('INSERT INTO reservationDB (firstname, lastname, email, mobile, restaurant, guestsnumber, date, time, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [firstname, lastname, email, mobile, restaurant, guestsnumber, date, time, notes], (err) => {
        if (err) {
            console.error('Error inserting data:', err.message);
            res.status(500).send('Internal Server Error');
            return;
        }
        else {console.log('Data inserted successfully');}
    });
    res.render('submission', { 
        firstname: firstname,
        lastname: lastname,
        restaurant: restaurant,
        date: date,
        time: time,
        guestsnumber: guestsnumber
    });
});

app.get('/reservation-info',(req, res) =>{  
    db.all ('SELECT * from reservationDB', (err, rows) => {
        if (err) {
            return console.error(err.message);
        }
        res.redirect('reservation-info', {reservations: rows });
    })
});

app.post('/search', (req, res) => {
    let search = req.body.restaurant;
    console.log('Search term:', search); 
    const query = `SELECT * FROM reservationDB WHERE restaurant LIKE '%${search}%'`;

    db.all(query, (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Internal Server Error');
            return;
        }
        console.log('Search results:', rows);
        res.render('search', { title: 'Search Results', search: search, rows: rows });
    });
});


app.post('/menu-search', async (req, res) => {
    const searchTerm = req.body.menuitem;
    try {
        const results = await findMenuItems(searchTerm);
        res.render('menu-search', { title: 'Menu Search Results', results: results || [] });
    } catch (err) {
        console.error('Error searching menu items:', err);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

