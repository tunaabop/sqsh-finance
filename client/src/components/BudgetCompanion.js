import { useEffect, useState } from "react"; 


// calcularte average spend per day
const daysSofar = new Date().getDate();

function BudgetCompanion() {
    // fetch total expenses for the month
    useEffect(() => {
        fetch("http://localhost:4000/expenses/total")
        .then(res => res.json())
        .then(data => setTotal(Number(data.total)))
        .catch(err => console.error("Error fetching monthly total:", err));
    }, []);
    const [total, setTotal] = useState(0);
    
    // calculate average per day using total
    const avgPerDay = total > 0 ? total / daysSofar : 0;
    
    // determine opacity for budget companion based on avgPerDay
    let opacity = 1;
    if (avgPerDay >= 40) {
        opacity = 0.2;
    }
    else if (avgPerDay >= 30) {
        opacity = 0.4;
    }
    else if (avgPerDay >= 20) {
        opacity = 0.7;
    }

    // render budget companion component
    return (
        <div className="budget-companion" >
            <p className="budget-companion-title">🍂 My Budget Companion: Paddington Dream Bag</p>
           
            <img 
                src="budget-companion.png"
                alt="Budget Companion"
                style={{opacity}}
                className="companion-image">
            </img>

            <p className="budget-companion-message">
                Avg ${avgPerDay.toFixed(2)} / day
            </p>
             {avgPerDay < 20 && <p>You're doing great! Keep it up! 🌟</p>}
            {avgPerDay >= 20 && avgPerDay < 30 && <p>Watch your spending a bit. 🍁</p>}
            {avgPerDay >= 30 && avgPerDay < 40 && <p>Consider tightening your budget. 🍂</p>}
            {avgPerDay >= 40 && <p>Alert! You're overspending! 🍃</p>}
        </div>
    );
}

export default BudgetCompanion;