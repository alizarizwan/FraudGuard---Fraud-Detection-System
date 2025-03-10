📄 FraudGuard - AI-Powered Smart Expense Tracker  
🚀 Detect Suspicious Transactions & Track Expenses Securely  

🔹 Overview  
FraudGuard is a full-stack expense tracking application designed to help users manage their spending while detecting fraudulent transactions in real-time. The system uses FastAPI (Python) for the backend, React.js for the frontend, and integrates fraud detection rules to flag suspicious activity.  

📌 Features  
✅ User Authentication – Secure login via JWT tokens  
✅ Expense Tracking – Users can log and categorize expenses  
✅ Fraud Detection System – Flags suspicious transactions using business rules  
✅ REST API – Secure API endpoints for adding & retrieving transactions  
✅ Dashboard Visualization – Interactive React.js UI to monitor spending trends  

📌 Fraud Detection Logic  
FraudGuard uses business rules to detect suspicious activity:   
🚨 Flags transactions that exceed $5,000  
🚨 Detects multiple high-value transactions in a short period  
🚨 Warns users about unusual category spending (e.g., $500 on Fast Food)  
