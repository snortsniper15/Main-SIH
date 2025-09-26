import React, { useState } from "react";
import PredictionForm from "./components/PredictionForm";
import LogsTable from "./components/LogsTable";

function App() {
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="container">
      <h1>🎓 AI Dropout Prediction & Counseling System</h1>
      <PredictionForm onPrediction={() => setRefresh(!refresh)} />
      <hr />
      <LogsTable refresh={refresh} />
    </div>
  );
}

export default App;
