const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');  // Import the db.js file

const app = express();
app.use(cors({
    origin: 'http://localhost:3000', // Replace with your React app's URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
  }));
app.use(bodyParser.json());

// API endpoint to get all employees
app.get('/employees', (req, res) => {
    const sql = 'SELECT * FROM EMPLOYEE';
    db.query(sql, (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
});

// API endpoint to add a new employee
app.post('/add-employee', (req, res) => {
    const data = req.body;
    const sql = 'INSERT INTO EMPLOYEE SET ?';  // Insert data using SET
    db.query(sql, data, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json({ message: 'Employee added successfully', id: result.insertId });
        }
    });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
