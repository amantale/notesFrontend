import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
const { axios } = require('axios');
import NotesList from './NotesList.mjs';

jest.mock('axios');

describe('NotesList component', () => {
  test('renders and handles task completion', async () => {
    const mockNotes = [
      { id: 1, content: 'Note 1' },
      { id: 2, content: 'Note 2' },
    ];

    axios.get.mockResolvedValueOnce({ data: mockNotes });

    render(<NotesList />);

    expect(screen.getByTestId('header-notes-list')).toBeInTheDocument();
    expect(screen.getByText('Note 1')).toBeInTheDocument();
    expect(screen.getByText('Note 2')).toBeInTheDocument();


    axios.delete.mockResolvedValueOnce({});
    
    fireEvent.click(screen.getByText('Note 1').closest('li').querySelector('button'));

  
    await waitFor(() => {
      expect(axios.delete).toHaveBeenCalledWith('http://localhost:8080/notes/1');
      expect(axios.get).toHaveBeenCalledWith('http://localhost:8080/notes');
    });

    expect(screen.queryByText('Note 1')).not.toBeInTheDocument();
  });
});
