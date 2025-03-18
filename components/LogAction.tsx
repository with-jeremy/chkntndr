import React from "react";

interface LogActionProps {
  logs: string[];
}

const LogAction: React.FC<LogActionProps> = ({ logs }) => {
  return (
    <div>
      <h3>Action Logs:</h3>
      <button onClick={() => console.log("Log action executed")}>
        Log Action
      </button>
      <ul>
        {logs.map((log, idx) => (
          <li key={idx}>{log}</li>
        ))}
      </ul>
    </div>
  );
};

export default LogAction;
