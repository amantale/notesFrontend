import React, { useState } from 'react';
import axios from 'axios';

const CreateNote = () => {
    const [noteContent, setNoteContent] = useState('');
    const [isNoteSaved, setIsNoteSaved] = useState(false);
    const [validationError, setValidationError] = useState('');
    const [saveError, setSaveError] = useState('');
  
    const handleInputChange = (e) => {
      setNoteContent(e.target.value);
    };
  
    const handleSaveNote = async () => {
      // Validate if note content is not empty
      if (!noteContent.trim()) {
        setValidationError('A note cannot be empty. Please insert some text');
        return;
      }
  
      try {
        await axios.post('http://localhost:8080/notes', { content: noteContent });
        setIsNoteSaved(true);
        setNoteContent('');
        setValidationError(''); // Clear validation error when the note is saved
        setSaveError(''); // Clear any previous save errors
  
      } catch (error) {
        console.error('Error saving note:', error);
        setSaveError('Failed to save note');
  
        // Clear the save error after 5 seconds
        setTimeout(() => {
          setSaveError('');
        }, 5000);
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
        
        {validationError && <p style={{ color: 'red' }}>{validationError}</p>}
  
        {saveError && <p style={{ color: 'red' }}>{saveError}</p>}
  
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
  
