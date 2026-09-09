import React, { useState } from 'react';
import { Stack } from 'expo-router';
import { CredentialsContext } from '../components/CredentialsContext';

export default function RootLayout() {
  const [storedCredentials, setStoredCredentials] = useState({});
  
  return (
    <CredentialsContext.Provider 
      value={{ storedCredentials, setStoredCredentials }}
    >
      <Stack screenOptions={{ headerShown: false}}/>
    </CredentialsContext.Provider>

  )
}