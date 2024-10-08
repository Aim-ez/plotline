import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { Link } from 'expo-router'

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Welcome to PlotLine!</Text>
      <StatusBar style="auto"/>
      <Link href="/home" style={{color: 'blue'}}>Go to Home</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  justifyContent: 'center',
  },
});
