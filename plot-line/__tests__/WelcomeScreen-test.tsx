
import Welcome from '@/app/screens/Welcome';
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

describe('Welcome Screen', () => {
  it('renders correctly', () => {
    const mockNavigate = jest.fn();
    const mockGoBack = jest.fn();
    const mockDispatch = jest.fn();
    const mockIsFocused = jest.fn();
    
    const navigation = {
      navigate: mockNavigate,
      goBack: mockGoBack,
      dispatch: mockDispatch,
      isFocused: mockIsFocused,
      // Add any other navigation methods you might be using
    };

    const { getByText, getByTestId } = render(<Welcome navigation={navigation} />);

    // Check for the presence of key text and components
    expect(getByText('Welcome to PlotLine')).toBeTruthy();
    expect(getByText('Insert Witty Subtitle')).toBeTruthy();
    expect(getByText('Get Started')).toBeTruthy();

    // Check if the logo and image are in the document (use testID if necessary)
    expect(getByTestId('PageLogo')).toBeTruthy();
    expect(getByTestId('ScreenImage')).toBeTruthy();
  });

  it('navigates to Login when the button is pressed', () => {
    const mockNavigate = jest.fn();
    const mockGoBack = jest.fn();
    const mockDispatch = jest.fn();
    const mockIsFocused = jest.fn();
    
    const navigation = {
      navigate: mockNavigate,
      goBack: mockGoBack,
      dispatch: mockDispatch,
      isFocused: mockIsFocused,
    };

    const { getByText } = render(<Welcome navigation={navigation} />);

    const button = getByText('Get Started');
    
    // Simulate pressing the button
    fireEvent.press(button);

    // Check if the navigate function was called with 'Login'
    expect(mockNavigate).toHaveBeenCalledWith('Login');
  });
});
