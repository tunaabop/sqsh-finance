// import { useEffect, useState } from "react"; 


// calcularte average spend per day
// const daysSofar = new Date().getDate();

function BudgetCompanion({avgPerDay}) {
    // fetch total expenses for the month
    // useEffect(() => {
    //     fetch("http://localhost:4000/expenses/total")
    //     .then(res => res.json())
    //     .then(data => setTotal(Number(data.total)))
    //     .catch(err => console.error("Error fetching monthly total:", err));
    // }, []);
    // const [total, setTotal] = useState(0);
    
    // // calculate average per day using total
    // const avgPerDay = total > 0 ? total / daysSofar : 0;
    
    // determine opacity for budget companion based on avgPerDay
    let opacity = 1;
    if (avgPerDay >= 90) {
        opacity = 0.2;
    }
    else if (avgPerDay >= 80) {
        opacity = 0.4;
    }
    else if (avgPerDay >= 77) {
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
             {avgPerDay < 77 && <p>You're doing great! Keep it up! 🌟</p>}
            {avgPerDay >= 77 && avgPerDay < 80 && <p>Watch your spending a bit. 🍁</p>}
            {avgPerDay >= 80 && avgPerDay < 90 && <p>Consider tightening your budget. 🍂</p>}
            {avgPerDay >= 90 && <p>Alert! You're overspending! 🍃</p>}
        </div>
    );
}

export default BudgetCompanion;