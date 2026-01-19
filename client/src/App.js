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

  return (
    <main className="container">
      <h1>Squash ࿔*:･༄˖°.🍂</h1>
      <p>Thoughtfaul budgeting, made simple.</p>
      <AddExpense onAdd={expense => setExpenses([...expenses, expense])} />
        <ExpenseList expenses={expenses} />
       {/* <ul>
        {expenses.map(exp => (
          <li key={exp.id}>
            ${exp.amount} — {exp.category}
          </li>
        ))}
      </ul> */}
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
