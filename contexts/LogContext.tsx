"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface LogEntry {
  matchId: string;
  action: string;
}

interface LogContextType {
  logs: string[];
  logAction: (action: string) => void;
  setMatchId: (id: string) => void;
}

const LogContext = createContext<LogContextType | undefined>(undefined);

export const LogProvider = ({ children }: { children: ReactNode }) => {
  const [matchId, setMatchIdState] = useState<string>("");
  const [logEntries, setLogEntries] = useState<LogEntry[]>([]);

  // logAction appends a new log entry associated with the current matchId
  const logAction = (action: string) => {
    if (!matchId) {
      console.warn("No matchId set. Logs will not be associated with a match.");
      return;
    }
    setLogEntries((prev) => [...prev, { matchId, action }]);
  };

  // setMatchId updates the matchId and clears logs for a new session
  const setMatchId = (id: string) => {
    setMatchIdState(id);
    setLogEntries([]); // Clear logs for the new match session
  };

  // Filter logs to only include entries for the current matchId
  const logs = logEntries.filter((entry) => entry.matchId === matchId).map((entry) => entry.action);

  return (
    <LogContext.Provider value={{ logs, logAction, setMatchId }}>
      {children}
    </LogContext.Provider>
  );
};

export const useLog = (): LogContextType => {
  const context = useContext(LogContext);
  if (!context) {
    throw new Error("useLog must be used within a LogProvider");
  }
  return context;
};
