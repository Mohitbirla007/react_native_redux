import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Home } from '../src/screens/Home';

describe('LoginScreen', () => {
  it('shows welcome text after login', () => {
    const { getByTestId, getByText, queryByTestId } = render(<Home />);
    const input = getByTestId('draggable-item');
    
  })
})