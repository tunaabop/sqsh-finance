import { useState } from "react";

function AddExpense({ onAdd }) {
    const [form, setForm] = useState({
        amount: "",
        category: "",
        description: "",
        date: "",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch("/expenses", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });

        const data = await res.json();
        onAdd(data);
        setForm({ amount: "", category: "", description: "", date: "" });
    };

    return (
        <form onSubmit={handleSubmit} className="card">
            <h2>Add an expense</h2>

            <input
                name="amount"
                type="number"
                value={form.amount}
                onChange={handleChange}
                placeholder="Amount"
            />

            <input
                name="category"
                type="text"
                value={form.category}
                onChange={handleChange}
                placeholder="Category"
            />

            <input
                name="description"
                type="text"
                value={form.description}
                onChange={handleChange}
                placeholder="Description"
            />

            <input
                name="date"
                type="date"
                value={form.date}
                onChange={handleChange}
            />  
            <button type="submit">Add Expense</button>
        </form>
    );
}

export default AddExpense;