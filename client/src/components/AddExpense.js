import { useState } from "react";
function AddExpense({  setExpenses }) {
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

        fetch("http://localhost:4000/expenses", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form)
        })
        .then(res => res.json())
        .then(createdExpense => {
            console.log("CREATED EXPENSE FROM SERVER:", createdExpense);
            setExpenses(prev => [...prev, createdExpense]);
        });

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

             <select
                name="category"
                type="text"
                value={form.category}
                onChange={handleChange}
                required
            >
                <option value="">Select category</option>
                <option value="Food">Food</option>
                <option value="Rent">Rent</option>
                <option value="Fun">Fun</option>
                <option value="Transport">Transport</option>
                <option value="Other">Other</option>
            </select>
            
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