function ExpenseList({ expenses }) {
    if (!expenses.length) {
        return <p className="empty">No expenses recorded yet. Add one when you're ready.</p>;
    }
    return (
        <ul className="expense-list">
            {expenses.map((expense) => (
                <li key={expense.id} className="expense-item">
                    <div>
                        <strong>${expense.amount}</strong>
                        <span className="category">{expense.category || "Uncategorized"}</span>
                    </div>

                    <small>{expense.description}</small>
                    <small className="date">{new Date(expense.date).toLocaleDateString()}</small>
                </li>
            ))}
        </ul>
    );
}

export default ExpenseList;