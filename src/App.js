// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';  // Import Routes
import NotesList from './components/NotesList';
import CreateNote from './components/CreateNote';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav>
            <h1>Notes app</h1>
            <ul>
              <li>
                <Link to="/see-all-notes">See All of My Notes</Link>
              </li>
              <li>
                <Link to="/create-note">Create a Note</Link>
              </li>
            </ul>
          </nav>
          
          <Routes>  {}
            <Route path="/see-all-notes" element={<NotesList />} />
            <Route path="/create-note" element={<CreateNote />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
