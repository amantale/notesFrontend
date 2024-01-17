// NotesList.mjs
import React, { useState, useEffect } from 'react';
const { default: axios } = require('axios');

const NotesList = () => {
  const [notes, setNotes] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [completeTaskError, setCompleteTaskError] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await axios.get('http://localhost:8080/notes');
      setNotes(response.data);
      setFetchError(null);
    } catch (error) {
      console.error('Error fetching notes:', error);
      setFetchError('There were no notes found');
    }
  };

  const handleCompleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/notes/${id}`);
      fetchNotes();
      setCompleteTaskError(null);
    } catch (error) {
      console.error(`Error completing task with ID ${id}:`, error);
      setCompleteTaskError('Failed to complete the task');
    }
  };

  return (
    <div>
      <h2 data-testid='header-notes-list'>Notes List</h2>
      {fetchError && <p>{fetchError}</p>}
      <ul>
        {notes.length === 0 && !fetchError && <p>There were no notes found</p>}
        {notes.map((note) => (
          <li key={note.id}>
            {`${note.content}`}
            <button onClick={() => handleCompleteTask(note.id)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </button>
          </li>
        ))}
      </ul>
      {completeTaskError && <p>{completeTaskError}</p>}
    </div>
  );
};

export default NotesList;
