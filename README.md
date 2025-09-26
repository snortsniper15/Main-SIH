# AI-based Dropout Prediction & Counseling System

An AI-powered system to predict student dropout risk and provide counseling advice.

---

## Features

* Predicts student dropout risk using a ML model
* Logs predictions in database
* Displays advice and allows counselor actions
* React frontend with FastAPI backend

---

## Folder Structure

```
Main-SIH/
├── dropout_backend/
├── dropout-frontend/
└── run_project.bat
```

---

## Installation & Setup

### Backend

```bash
cd Main-SIH/dropout_backend
python -m venv venv
venv\Scripts\activate.bat
pip install -r requirements.txt
```

### Frontend

```bash
cd Main-SIH/dropout-frontend
npm install
```

---

## Running the Project

* Use `run_project.bat` to start backend (port 8000) and frontend (port 3000/3001)
* Or run backend and frontend manually:

```bash
# Backend
uvicorn main:app --reload --host 127.0.0.1 --port 8000

# Frontend
npm start
```

---

## Usage

1. Open React app in browser
2. Enter student data: GPA, Attendance, Assignments, Participation
3. Click **Predict** to get dropout risk and advice
4. View logs and update counselor actions if needed

---

## Frontend Prediction Form Code

```javascript
import React, { useState } from "react";
import axios from "axios";

function PredictionForm() {
  const [form, setForm] = useState({ gpa:"", attendance:"", assignments_submitted:"", participation_score:"" });
  const [result, setResult] = useState(null);

  const handleChange = e => setForm({...form, [e.target.name]: e.target.value});

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:8000/predict", form, { headers: {"Content-Type": "application/json"} });
      setResult(res.data);
    } catch(err) { alert("Error: " + err.message); }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="number" name="gpa" placeholder="GPA" onChange={handleChange} required />
      <input type="number" name="attendance" placeholder="Attendance" onChange={handleChange} required />
      <input type="number" name="assignments_submitted" placeholder="Assignments" onChange={handleChange} required />
      <input type="number" name="participation_score" placeholder="Participation" onChange={handleChange} required />
      <button type="submit">Predict</button>
      {result && <div><p>Dropout Risk: {result.dropout_risk}</p><p>Advice: {result.advice}</p></div>}
    </form>
  );
}

export default PredictionForm;
```

---

## Technology Stack

* Frontend: React, Axios
* Backend: FastAPI, Uvicorn
* Database: SQLite
* ML Model: scikit-learn
