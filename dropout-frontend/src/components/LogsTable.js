import React, { useEffect, useState } from "react";
import axios from "axios";
import CounselorAction from "./CounselorAction";

function LogsTable({ refresh }) {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetchLogs();
  }, [refresh]);

  const fetchLogs = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/logs");
      setLogs(res.data);
    } catch (err) {
      console.error("Error fetching logs");
    }
  };

  return (
    <div>
      <h2>📋 Prediction Logs</h2>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>GPA</th>
            <th>Attendance</th>
            <th>Assignments</th>
            <th>Participation</th>
            <th>Dropout Risk</th>
            <th>Advice</th>
            <th>Counselor Action</th>
            <th>Update Action</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id}>
              <td>{log.id}</td>
              <td>{log.gpa}</td>
              <td>{log.attendance}</td>
              <td>{log.assignments_submitted}</td>
              <td>{log.participation_score}</td>
              <td>{log.dropout_risk}</td>
              <td>{log.advice}</td>
              <td>{log.counselor_action}</td>
              <td><CounselorAction logId={log.id} onUpdate={fetchLogs} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LogsTable;
