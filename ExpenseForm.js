import React, { useState } from "react";
import axios from "axios";

const ExpenseForm = () => {
    const [user, setUser] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [location, setLocation] = useState("");
    const [date, setDate] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        try {
            const response = await axios.post("http://localhost:8000/add_expense", 
                { user, amount: parseFloat(amount), category, location, date },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            alert(`Expense added! Fraud Check: ${response.data.fraud_flag ? "⚠️ Fraudulent" : "✅ Safe"}`);
            setUser(""); setAmount(""); setCategory(""); setLocation(""); setDate("");
        } catch (error) {
            alert("Error adding expense");
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
            <input type="text" placeholder="User" value={user} onChange={(e) => setUser(e.target.value)} required />
            <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} required />
            <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} required />
            <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} required />
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            <button type="submit">Add Expense</button>
        </form>
    );
};

export default ExpenseForm;
