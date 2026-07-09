import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../../src/components/SearchBar/SearchBar';

describe('SearchBar', () => {
  it('renders with placeholder text', () => {
    render(<SearchBar onSearch={() => {}} />);
    expect(screen.getByPlaceholderText('Search for movies...')).toBeTruthy();
  });

  it('calls onSearch when input changes', () => {
    const mockOnSearch = vi.fn();
    render(<SearchBar onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText('Search for movies...');
    fireEvent.change(input, { target: { value: 'Inception' } });

    expect(mockOnSearch).toHaveBeenCalledWith('Inception');
  });

  it('shows clear button when input has value', () => {
    render(<SearchBar onSearch={() => {}} initialValue="test" />);
    expect(screen.getByLabelText('Clear search')).toBeTruthy();
  });

  it('clears input and calls onSearch with empty string', () => {
    const mockOnSearch = vi.fn();
    render(<SearchBar onSearch={mockOnSearch} initialValue="test" />);

    fireEvent.click(screen.getByLabelText('Clear search'));
    expect(mockOnSearch).toHaveBeenCalledWith('');
  });
});
