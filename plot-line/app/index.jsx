import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SplashScreen from 'expo-splash-screen';

import { Redirect } from 'expo-router';
import { CredentialsContext } from '../components/CredentialsContext';


export default function App() {
  const [appReady, setAppReady] = useState(false);
  const [storedCredentials, setStoredCredentials] = useState(null);

  // Load stored credentials from AsyncStorage
  const loadCredentials = async () => {
    try {
      const result = await AsyncStorage.getItem('plotlineCredentials');
      setStoredCredentials(result ? JSON.parse(result) : null);
    } catch (error) {
      console.error('Error loading credentials from AsyncStorage:', error);
      setStoredCredentials(null); // Set to null in case of error
    }
  };

  // Show the splash screen until app is ready
  useEffect(() => {
    const prepareApp = async () => {
      try {
        await SplashScreen.preventAutoHideAsync(); // Prevent splash screen from hiding
        await loadCredentials(); // Wait for credentials to load
      } catch (e) {
        console.warn(e);
      } finally {
        setAppReady(true); // Set app to ready
        SplashScreen.hideAsync(); // Hide the splash screen
      }
    };

    prepareApp(); // Run the preparation code when app starts
  }, []);

  // Don't render anything until app is ready
  if (!appReady) {
    return null; 
  }

  return (
    <CredentialsContext.Provider value={{ storedCredentials, setStoredCredentials }}>
      <Redirect href="/welcome" />
    </CredentialsContext.Provider>
  );
}
