const express = require('express');
const sequelize = require('./config/database');

const app = express();
const port = 3000;

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

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
