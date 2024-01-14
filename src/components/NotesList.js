import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
      <h1>Notes List</h1>
      {fetchError && <p>{fetchError}</p>}
      <ul>
        {notes.length === 0 && !fetchError && <p>There were no notes found</p>}
        {notes.map((note) => (
          <li key={note.id}>
            {`Content: ${note.content}`}
            <button onClick={() => handleCompleteTask(note.id)}>
              Complete Task
            </button>
          </li>
        ))}
      </ul>
      {completeTaskError && <p>{completeTaskError}</p>}
    </div>
  );
};

export default NotesList;
