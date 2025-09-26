import React, { useState } from "react";
import axios from "axios";

function CounselorAction({ logId, onUpdate }) {
  const [action, setAction] = useState("");

  const updateAction = async () => {
    try {
      await axios.put(`http://127.0.0.1:8000/logs/${logId}`, { counselor_action: action });
      setAction("");
      onUpdate();
    } catch (err) {
      alert("Error updating action");
    }
  };

  return (
    <div>
      <input 
        type="text"
        placeholder="Enter action"
        value={action}
        onChange={(e) => setAction(e.target.value)}
      />
      <button onClick={updateAction}>Save</button>
    </div>
  );
}

export default CounselorAction;
