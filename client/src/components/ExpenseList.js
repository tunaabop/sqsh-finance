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
    <li
      key={exp.id}
      className={`expense-row ${exp._deleting ? "deleting" : ""}`}
    >
      {editingId === exp.id ? (
        <form onSubmit={submitEdit} className="edit-form">
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

          <select
            name="category"
            value={editForm.category}
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
            name="date"
            type="date"
            value={editForm.date}
            onChange={handleChange}
          />

          <div className="expense-actions">
            <button type="submit">Save</button>
            <button
              type="button"
              onClick={() => setEditingId(null)}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <span>
            {exp.description} — ${exp.amount}
          </span>
          <span>{exp.category}</span>
          <span>{exp.date}</span>

          <div className="expense-actions">
            <button onClick={() => startEdit(exp)}>✏️ Adjust</button>
            <button onClick={() => onDelete(exp.id)}>🍂 Remove</button>
          </div>
        </>
      )}
    </li>
  ))}
</ul>

  );
}

export default ExpenseList;
