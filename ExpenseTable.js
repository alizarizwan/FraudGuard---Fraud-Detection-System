import React, { useEffect, useState } from "react";
import axios from "axios";

const ExpenseTable = () => {
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        const fetchExpenses = async () => {
            const token = localStorage.getItem("token");
            const response = await axios.get("http://localhost:8000/expenses", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setExpenses(response.data);
        };

        fetchExpenses();
    }, []);

    return (
        <table border="1" cellPadding="5" cellSpacing="0">
            <thead>
                <tr>
                    <th>User</th>
                    <th>Amount</th>
                    <th>Category</th>
                    <th>Location</th>
                    <th>Date</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {expenses.map((expense, index) => (
                    <tr key={index}>
                        <td>{expense.user}</td>
                        <td>${expense.amount.toFixed(2)}</td>
                        <td>{expense.category}</td>
                        <td>{expense.location}</td>
                        <td>{expense.date}</td>
                        <td style={{ color: expense.fraud_flag ? "red" : "green" }}>
                            {expense.fraud_flag ? "⚠️ Fraud" : "✅ Safe"}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ExpenseTable;
