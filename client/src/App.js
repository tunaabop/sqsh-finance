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

  const deleteExpense = async (id) => {
    const res =await fetch(`/expenses/${id}`, {
        method: "DELETE",
    });
    console.log(res.status); // TODO
    setExpenses(prev => prev.filter(exp => exp.id !== id));
    // Optionally, you might want to refresh the expense list here or lift state up to handle it
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
