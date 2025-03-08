from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
import sqlite3
import jwt
import datetime
from fastapi.security import OAuth2PasswordBearer
from typing import List

app = FastAPI()

# OAuth2 authentication scheme
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="generate_token")
SECRET_KEY = "your_secret_key"

# Database setup
DB_FILE = "database.db"

def init_db():
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    cursor.execute('''CREATE TABLE IF NOT EXISTS expenses (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        user TEXT,
                        amount REAL,
                        category TEXT,
                        location TEXT,
                        date TEXT,
                        fraud_flag INTEGER)''')
    conn.commit()
    conn.close()

init_db()

# Pydantic model for expenses
class Expense(BaseModel):
    user: str
    amount: float
    category: str
    location: str
    date: str

# Function to check fraud (simple rules-based)
def check_fraud(expense: Expense) -> int:
    # Example fraud rules
    if expense.amount > 5000:  # Flag expenses above $5000
        return 1  # Fraud detected
    if expense.category == "Fast Food" and expense.amount > 300:
        return 1  # Too much spent on fast food
    return 0  # No fraud detected

# Token generation
@app.post("/generate_token")
def generate_token(user: str):
    expiration = datetime.datetime.utcnow() + datetime.timedelta(hours=1)
    token = jwt.encode({"sub": user, "exp": expiration}, SECRET_KEY, algorithm="HS256")
    return {"access_token": token, "token_type": "bearer"}

# Secure endpoint for adding expenses
@app.post("/add_expense")
def add_expense(expense: Expense, token: str = Depends(oauth2_scheme)):
    fraud_flag = check_fraud(expense)

    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    cursor.execute("INSERT INTO expenses (user, amount, category, location, date, fraud_flag) VALUES (?, ?, ?, ?, ?, ?)",
                   (expense.user, expense.amount, expense.category, expense.location, expense.date, fraud_flag))
    conn.commit()
    conn.close()

    return {"message": "Expense recorded successfully", "fraud_flag": fraud_flag}

# Retrieve all expenses
@app.get("/expenses", response_model=List[Expense])
def get_expenses(token: str = Depends(oauth2_scheme)):
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    cursor.execute("SELECT user, amount, category, location, date, fraud_flag FROM expenses")
    rows = cursor.fetchall()
    conn.close()

    return [{"user": row[0], "amount": row[1], "category": row[2], "location": row[3], "date": row[4], "fraud_flag": row[5]} for row in rows]

@app.get("/")
def read_root():
    return {"message": "Welcome to the Smart Expense Tracker API!"}
