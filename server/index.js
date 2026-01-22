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

// Option to delete an expense row where id matches
app.delete("/expenses/:id", async (req, res) => {
    const { id } = req.params;
    const result =
    await pool.query("DELETE FROM expenses WHERE id = $1", [id]);
    res.sendStatus(204);
});

//Option to edit/update an expense row where id matches
app.put("/expenses/:id", async (req, res) => {
    const { id } = req.params;
    const {description, amount, category, date} = req.body;

    try {
        const result = await pool.query(
            "UPDATE expenses SET description = $1, amount = $2, category = $3, date = $4 WHERE id = $5 RETURNING *",
            [description, amount, category, date, id]
        );
        res.json(result.rows[0]);
    }catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Failed to update expense " });
    }
});

// add route to get total expenses for the current month
app.get("/expenses/total", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT COALESCE(SUM(amount), 0) AS total FROM expenses");
            
        res.json(result.rows[0]); // returns { total: <sum> }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Failed to fetch monthly total" });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 