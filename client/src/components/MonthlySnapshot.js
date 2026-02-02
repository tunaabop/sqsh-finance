// import { useEffect, useState } from "react";   

export default function MonthlySnapshot({total, count, weeklyTotals}) {

    // const [total, setTotal] = useState(0);

    // useEffect(() => {
    //     fetch("http://localhost:4000/expenses/total")
    //     .then(res => res.json())
    //     .then(data => setTotal(Number(data.total)))
    //     .catch(err => console.error("Error fetching monthly total:", err));
    // }, []);
    const now = new Date();
    const currentMonth = now.toLocaleString('default', { month: 'long' });
    return (
         <div className="monthly-snapshot">
        <h2>🍁 {currentMonth} Snapshot</h2>
            <p className="snapshot-total">
            ${total.toFixed(2)}
        </p><p className="snapshot-meta">
                {count} expense
                {count !== 1 && "s"} logged
            </p>

            <div className="weekly-breakdown">
                <h3>Weekly spending</h3>
                <div className="weeks">
            {weeklyTotals.map((amount, i) => (
                <div key={i} className="week-column">
                <span className="week-label">W{i + 1}</span>
                <span className="week-amount">
                    ${amount.toFixed(0)}
                </span>
                </div>
            ))}
            </div>
            </div>
        </div>

        
        
    );
}