const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const Users = require('./models/users');
const Appointments = require('./models/appointments');


const app = express();
const port = 3000;

app.use(cors({
    origin: 'http://localhost:5173' 
}));

sequelize.authenticate()
    .then(() => {
        console.log('Η σύνδεση με τη βάση δεδομένων ήταν επιτυχής.');
    })
    .catch(err => {
        console.error('Αποτυχία σύνδεσης με τη βάση δεδομένων:', err);
    });

app.get('/', (req, res) => {
    res.send('Backend API is running!');
});

app.get('/api/users', async (req, res) => {
    try {
        const users = await Users.findAll();
        res.json(users);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

app.get('/api/appointments', async (req, resa) => {
    try {
        const appointments = await Appointments.findAll();
        resa.json(appointments);
    } catch (err) {
        console.error('Error fetching appointments:', err);
        resa.status(500).json({ error: 'Something went wrong' });
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
