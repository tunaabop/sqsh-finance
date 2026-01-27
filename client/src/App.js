import { useEffect, useState } from "react";
// add expense form component
import AddExpense from "./components/AddExpense"; 
import ExpenseList from "./components/ExpenseList";
import MonthlySnapshot from "./components/MonthlySnapshot";
import BudgetCompanion from "./components/BudgetCompanion";

function App() {
  // make expenses = single source of truth, other values (total, avg, companion visuals) derive from this
  const [expenses, setExpenses] = useState([]);
  useEffect(() => {
  console.log("APP expenses:", expenses);
}, [expenses]);
  // fetch expenses on initial load
  useEffect(() => {
    fetch("/expenses")
      .then(res => res.json())
      .then(data => setExpenses(data));
  }, []);

  // calculate monthly snapshot data
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const monthlyExpenses = expenses.filter(exp => {
    const date = new Date(exp.date);
    return (
      date.getMonth() === currentMonth &&
      date.getFullYear() === currentYear
    );
  });

  // calcularte average spend per day
  const daysSofar = new Date().getDate();
  const monthlyTotal = monthlyExpenses.reduce((sum, exp) => sum + Number(exp.amount), 0);
  const avgPerDay = monthlyExpenses.length > 0  ? monthlyTotal / daysSofar : 0;
  

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

      {/* passing total and count to re-render MonthlySnapshot whenever expense added/deleted/updated */}
      <MonthlySnapshot total={monthlyTotal} count={monthlyExpenses.length} />

      {/* passing setExpenses to AddExpense so we can update expenses upon new expense creation */}
      <AddExpense setExpenses={setExpenses} />
      <ExpenseList expenses={expenses} setExpenses={setExpenses} 
        onDelete={deleteExpense} 
        onUpdate={updateExpense}/>

      <BudgetCompanion avgPerDay={avgPerDay} expenses={expenses} />

    </main>
  );
}

export default App;
