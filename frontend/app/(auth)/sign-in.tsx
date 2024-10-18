import { StyleSheet, View, Text } from 'react-native'
import React from 'react'

const SignIn = () => {
  return (
    <View>
      <Text>SignIn</Text>
    </View>
  )
}

export default SignIn

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EFEBF9',
    padding: 20,
  },
  logo: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#798CE7',
    marginBottom: 20,
  },
  inputBox: {
    height: 40,
    borderColor: '#A574D5',
    borderWidth: 1,
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#798CE7',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  results: {
    width: '100%',
  },
})