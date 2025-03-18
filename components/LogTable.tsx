import React from "react";
import { useLog } from "@/contexts/LogContext";

const LogTable: React.FC = () => {
  const { logs } = useLog();

  return (
    <div>
      
      <h3>Action Logs Table:</h3>
      <table className="table-auto mt-4 border">
        <thead>
          <tr>
            <th className="px-2 py-1 border">#</th>
            <th className="px-2 py-1 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, idx) => (
            <tr key={idx}>
              <td className="px-2 py-1 border">{idx}</td>
              <td className="px-2 py-1 border">{log}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LogTable;
