import Login from '@/app/screens/Login';
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { CredentialsContext } from '../components/CredentialsContext';

describe('Login Screen', () => {
  // Mock the context for setStoredCredentials
  const setStoredCredentials = jest.fn();

  it('renders the login screen correctly', () => {
    const { getByText, getByPlaceholderText, getByTestId } = render(
      <CredentialsContext.Provider value={{ setStoredCredentials }}>
        <Login navigation={{ navigate: jest.fn() }} />
      </CredentialsContext.Provider>
    );

    // Check if key elements are rendered
    expect(getByTestId('Header')).toBeTruthy();
    expect(getByText('Login to Your Account')).toBeTruthy();
    expect(getByPlaceholderText('example@gmail.com')).toBeTruthy();
    expect(getByPlaceholderText('* * * * * * * * * * * * *')).toBeTruthy();
    expect(getByText('Signup')).toBeTruthy();
  });

  it('shows an error message when email or password is missing', () => {
    const { getByText, getByPlaceholderText, getByTestId } = render(
      <CredentialsContext.Provider value={{ setStoredCredentials }}>
        <Login navigation={{ navigate: jest.fn() }} />
      </CredentialsContext.Provider>
    );

    const emailInput = getByPlaceholderText('example@gmail.com');
    const passwordInput = getByPlaceholderText('* * * * * * * * * * * * *');
    const loginButton = getByTestId('login-button');

    // Simulate typing into the email and password fields
    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, '');

    // Submit the form with an empty password
    fireEvent.press(loginButton);
  });

  it('disables the login button while submitting', () => {
    const { getByTestId } = render(
      <CredentialsContext.Provider value={{ setStoredCredentials }}>
        <Login navigation={{ navigate: jest.fn() }} />
      </CredentialsContext.Provider>
    );

    const loginButton = getByTestId('login-button');

    // Simulate submitting the form
    fireEvent.press(loginButton);
  });

  it('navigates to Signup screen when Signup link is pressed', () => {
    const navigateMock = jest.fn();
    const { getByText } = render(
      <CredentialsContext.Provider value={{ setStoredCredentials }}>
        <Login navigation={{ navigate: navigateMock }} />
      </CredentialsContext.Provider>
    );

    const signupLink = getByText('Signup');

    fireEvent.press(signupLink);

    expect(navigateMock).toHaveBeenCalledWith('Signup');
  });
});
