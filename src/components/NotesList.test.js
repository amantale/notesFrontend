import { render, screen, cleanup } from '@testing-library/react'
import NotesList from './NotesList'

test('should render todo component', () => {
  render(<NotesList/>)
  const title = screen.getByTestId('header-notes-list')
  expect(title).toBeInTheDocument();
})