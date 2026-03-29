import React, { createContext, useContext, useState, useEffect } from 'react';

const JournalContext = createContext(null);

export const useJournal = () => {
  const context = useContext(JournalContext);
  if (!context) throw new Error("useJournal must be used within JournalProvider");
  return context;
};

export const JournalProvider = ({ children }) => {
  const [entries, setEntries] = useState([]);

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('abyss_journal');
    if (saved) {
      try { setEntries(JSON.parse(saved)); } catch (e) { console.error("Corrupted journal", e); }
    }
  }, []);

  // Save to local storage automatically
  useEffect(() => {
    localStorage.setItem('abyss_journal', JSON.stringify(entries));
  }, [entries]);

  const logEntry = (id, classification, depth, notes) => {
    setEntries(prev => {
      // Prevent duplicates
      if (prev.some(e => e.id === id)) return prev;
      return [...prev, {
        id, classification, depth, notes,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }];
    });
  };

  const clearJournal = () => setEntries([]);

  return (
    <JournalContext.Provider value={{ entries, logEntry, clearJournal }}>
      {children}
    </JournalContext.Provider>
  );
};
