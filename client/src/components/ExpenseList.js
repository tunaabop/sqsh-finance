import { useState } from "react";

function ExpenseList({ expenses, onDelete, onUpdate }) {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    description: "",
    amount: "",
    category: "",
    date: "",
  });

  const startEdit = (expense) => {
    setEditingId(expense.id);
    setEditForm({
      description: expense.description,
      amount: expense.amount,
      category: expense.category || "",
      date: expense.date ? expense.date.slice(0, 10) : "",
    });
  };

  const handleChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const submitEdit = async (e) => {
    e.preventDefault();
    await onUpdate(editingId, editForm);
    setEditingId(null);
  };

  return (
    <ul>
      {expenses.map(exp => (
        <li key={exp.id}>
          {editingId === exp.id ? (
            <form onSubmit={submitEdit}>
              <input
                name="description"
                value={editForm.description}
                onChange={handleChange}
              />
              <input
                name="amount"
                type="number"
                step="0.01"
                value={editForm.amount}
                onChange={handleChange}
              />
              <input
                name="category"
                value={editForm.category}
                onChange={handleChange}
              />
              <input
                name="date"
                type="date"
                value={editForm.date}
                onChange={handleChange}
              />
              <button type="submit">Save</button>
              <button type="button" onClick={() => setEditingId(null)}>Cancel</button>
            </form>
          ) : (
            <>
              <span>{exp.description} — ${exp.amount}</span>
              <span> {exp.category}</span>
              <span> {exp.date}</span>
              <button onClick={() => startEdit(exp)}>Edit</button>
              <button onClick={() => onDelete(exp.id)}>🗑</button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

export default ExpenseList;
