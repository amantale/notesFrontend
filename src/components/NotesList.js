// src/components/NotesList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NotesList = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await axios.get('http://localhost:8080/notes');
      setNotes(response.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  return (
    <div>
      <h1>Notes List</h1>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            {`Content: ${note.content}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotesList;
