import React, { useState } from "react";
import axios from "axios";

function PredictionForm({ onPrediction }) {
  const [form, setForm] = useState({
    gpa: "",
    attendance: "",
    assignments_submitted: "",
    participation_score: ""
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/predict", // Backend URL
        form,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      setResult(res.data);
      if (onPrediction) onPrediction();
    } catch (err) {
      console.error(err);
      alert("Error making prediction: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "20px auto", padding: "10px", border: "1px solid #ccc", borderRadius: "10px" }}>
      <h2>📊 Student Dropout Prediction</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input
          type="number"
          step="0.01"
          name="gpa"
          placeholder="GPA"
          value={form.gpa}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          step="0.01"
          name="attendance"
          placeholder="Attendance (%)"
          value={form.attendance}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="assignments_submitted"
          placeholder="Assignments Submitted"
          value={form.assignments_submitted}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          step="0.01"
          name="participation_score"
          placeholder="Participation Score"
          value={form.participation_score}
          onChange={handleChange}
          required
        />
        <button type="submit" style={{ padding: "10px", backgroundColor: "#4caf50", color: "white", border: "none", borderRadius: "5px" }}>
          {loading ? "Predicting..." : "Predict"}
        </button>
      </form>

      {result && (
        <div style={{ marginTop: "20px", padding: "10px", border: "1px solid #4caf50", borderRadius: "5px", backgroundColor: "#e8f5e9" }}>
          <h3>Result:</h3>
          <p><strong>Dropout Risk:</strong> {result.dropout_risk}</p>
          <p><strong>Advice:</strong> {result.advice}</p>
        </div>
      )}
    </div>
  );
}

export default PredictionForm;
