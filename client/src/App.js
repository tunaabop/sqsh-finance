import { useEffect, useState } from "react";
// add expense form component
import AddExpense from "./components/AddExpense"; 
import ExpenseList from "./components/ExpenseList";

function App() {
  const [expenses, setExpenses] = useState([]);
  useEffect(() => {
    fetch("/expenses")
      .then(res => res.json())
      .then(data => setExpenses(data));
  }, []);

  // calculate monthly snapshot data
  const currentMonth = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });

  const monthlyExpenses = expenses.filter(exp => {
    const expDate = new Date(exp.created_at);
    const now = new Date();
    return (expDate.getMonth() === now.getMonth() && expDate.getFullYear() === now.getFullYear());
  });
  
  const monthlyTotal = monthlyExpenses.reduce((total, exp) => total + parseFloat(exp.amount), 0);







  const deleteExpense = async (id) => {
    setExpenses(prev => prev.map(exp =>exp.id === id ? { ...exp, _deleting: true } : exp));

    await fetch(`/expenses/${id}`, { method: "DELETE" });

    // update state after a short delay to allow for UI transition
    setTimeout(() => {setExpenses(prev => prev.filter(exp => exp.id !== id))}, 200);

  };

  const updateExpense = async (id, updatedFields) => {
    const res = await fetch(`/expenses/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFields),
    });
    const data = await res.json();
    setExpenses(expenses.map(exp => exp.id === id ? data : exp));
  };

  return (
    <main className="container">
      <h1>Squash ࿔*:･༄˖°.🍂</h1>
      <p>Thoughtfaul budgeting, made simple.</p>
      <div className="monthly-snapshot">
        <h2>🍁 {currentMonth} Snapshot</h2>
        <p className="snapshot-total">
          ${monthlyTotal.toFixed(2)}
        </p>
        <p className="snapshot-meta">
          {monthlyExpenses.length} expense
          {monthlyExpenses.length !== 1 && "s"} logged
        </p>
      </div>

      <AddExpense onAdd={expense => setExpenses([...expenses, expense])} />
        <ExpenseList expenses={expenses}
         onDelete={deleteExpense} 
         onUpdate={updateExpense}/>
    </main>
  );
}

// function AddExpense({ onAdd }) {
//   const [amount, setAmount] = useState("");

//   const submit = async () => {
//     const res = await fetch("http://localhost:4000/expenses", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ amount, category: "Food" }),
//     });

//     const data = await res.json();
//     onAdd(data);
//   };

//   return (
//     <>
//       <input value={amount} onChange={e => setAmount(e.target.value)} />
//       <button onClick={submit}>Add</button>
//     </>
//   );
// }
export default App;
