import React, { createContext, useEffect, useState, ReactNode } from "react";

// Import environment variables
const apiUrl = import.meta.env.VITE_API_URL as string;

// Set interface for note context
export interface NotesContextType {
  notes: [];
  loading: boolean;
  error: boolean;
  fetchUserNotes: () => void;
  setNotes:React.Dispatch<React.SetStateAction<any>>;
}

// Create notes context
export const NotesContext = createContext<NotesContextType>(
  {} as NotesContextType
);

// Provider component
const NotesContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [notes, setNotes] = useState<[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const fetchUserNotes = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${apiUrl}/getnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        mode: 'cors',
        credentials: "include",
      });
      const response = await res.json();
      //console.log(response);
      if (res.ok) {
        setNotes(response.notes);
      }
    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserNotes();
  }, []);

  return (
    <NotesContext.Provider value={{ notes, fetchUserNotes,setNotes, loading, error }}>
      {children}
    </NotesContext.Provider>
  );
};

export default NotesContextProvider;
