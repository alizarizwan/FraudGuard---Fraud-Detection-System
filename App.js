import React from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseTable from "./components/ExpenseTable";

function App() {
    return (
        <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
            <h2>💰 Smart Expense Tracker</h2>
            <ExpenseForm />
            <ExpenseTable />
        </div>
    );
}

export default App;
