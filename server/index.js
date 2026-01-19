require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Sample route to test database connection
app.get("/", (req, res) => {
    res.send("Squash API is running 🥕");
});

app.get("/expenses", async (req, res) => {
    const result = await pool.query("SELECT * FROM expenses ORDER BY date DESC");
    res.json(result.rows);
});

app.post("/expenses", async (req, res) => {
    const { amount, category, description, date } = req.body;
    const result = await pool.query( 
        "INSERT INTO expenses (amount, category, description, date) VALUES ($1, $2, $3, $4) RETURNING *", 
        [amount, category, description, date || new Date()]
    );
    res.json(result.rows[0]);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 