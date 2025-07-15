import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Home } from '../src/screens/Home';

// describe('LoginScreen', () => {
//   it('shows welcome text after login', () => {
//     // const { getByTestId, getByText, queryByTestId } = render(<Home />);

//     // const input = getByTestId('flatlist');
//     // fireEvent.changeText(input, 'mohit@example.com');
//     // expect(input).toMatchSnapshot();

//     // fireEvent.press(getByText('Login'));

//     // expect(queryByTestId('email-input')).toBeNull();     // form hidden
//     // expect(getByText('Welcome, mohit@example.com')).toBeTruthy();
//   });
// });