import { useEffect, useState } from "react";   

export default function MonthlySnapshot() {

    const [total, setTotal] = useState(0);

    useEffect(() => {
        fetch("http://localhost:4000/expenses/total")
        .then(res => res.json())
        .then(data => setTotal(Number(data.total)))
        .catch(err => console.error("Error fetching monthly total:", err));
    }, []);
    
    return (
            <p className="snapshot-total">
                ${total.toFixed(2)}
            </p>
        
    );
}