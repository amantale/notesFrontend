// src/components/CreateNote.js

import React, { useState } from 'react';
import axios from 'axios';

const CreateNote = () => {
  const [noteContent, setNoteContent] = useState('');
  const [isNoteSaved, setIsNoteSaved] = useState(false);

  const handleInputChange = (e) => {
    setNoteContent(e.target.value);
  };

  const handleSaveNote = async () => {
    try {
      await axios.post('http://localhost:8080/notes', { content: noteContent });
      setIsNoteSaved(true);
      setNoteContent('');
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };
  

  return (
    <div>
      <h1>Create a Note</h1>
      <label htmlFor="noteContent">Introduce the text of the note:</label>
      <input
        type="text"
        id="noteContent"
        value={noteContent}
        onChange={handleInputChange}
      />
      <button onClick={handleSaveNote}>Save the note</button>
      
      {isNoteSaved && (
        <div>
          <p>Your note has been saved</p>
          {/* You can customize the popup/modal here */}
        </div>
      )}
    </div>
  );
};

export default CreateNote;
