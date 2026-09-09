import React, { useState, useContext } from 'react';
import { ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { Formik } from 'formik';
import axios from 'axios';
import { router } from 'expo-router';
import { CredentialsContext } from '../components/CredentialsContext';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import { HostURL } from '../constants/URL.js';
import TextInput from '../components/TextInput';

import {
  StyledContainer,
  InnerContainer,
  PageLogo,
  PageTitle,
  SubTitle,
  StyledFormArea,
  StyledButton,
  ButtonText,
  Colors,
  MsgBox,
  Line,
  ExtraView,
  ExtraText,
  TextLink,
  TextLinkContent,
} from '../components/styles';

const { primary, darkLight } = Colors;

const Signup = () => {
  const url = `${HostURL}/user/signup`;

  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();
  const [submitting, setSubmitting] = useState(false);

  // Context for managing credentials
  const { setStoredCredentials } = useContext(CredentialsContext);

  // Handle signup submission
  const handleSignup = async (credentials) => {
    try {
      setMessage(null);
      setSubmitting(true);

      // Normalize email and username
      const normalizedCredentials = {
        ...credentials,
        email: credentials.email.toLowerCase(),
        username: credentials.username.toLowerCase(),
      };

      const response = await axios.post(url, normalizedCredentials);
      const result = response.data;

      if (result.status !== 'SUCCESS') {
        handleMessage(result.message);
        setSubmitting(false);
      } else {
        persistLogin(result.data, result.message);
      }
    } catch (error) {
      console.error(error);
      handleMessage('An error occurred. Please try again.');
      setSubmitting(false);
    }
  };

  // Show a message
  const handleMessage = (message, type = 'FAILED') => {
    setMessage(message);
    setMessageType(type);
  };

  // Persist login and store credentials
  const persistLogin = async (credentials, message) => {
    try {
      await AsyncStorage.setItem('plotlineCredentials', JSON.stringify(credentials));
      setStoredCredentials(credentials);
      handleMessage(message, 'SUCCESS');
      setSubmitting(false);
      router.replace('/(tabs)/home');
    } catch (error) {
      console.error('Error persisting login:', error);
      handleMessage('Login persistence failed.');
      setSubmitting(false);
    }
  };

  // Validation logic
  const validateForm = (values) => {
    const { name, username, email, password, confirmPassword } = values;

    if (!name || !username || !email || !password || !confirmPassword) {
      return 'Please fill in all the fields.';
    }
    if (password !== confirmPassword) {
      return 'Passwords do not match.';
    }
    return null;
  };

  return (
    <KeyboardAvoidingWrapper>
      <StyledContainer>
        <ScrollView>
          <InnerContainer>
            <PageLogo source={require('../assets/images/PlotLogo.png')} />
            <PageTitle>Sign Up</PageTitle>
            <SubTitle>Create Your Account</SubTitle>

            <Formik
              initialValues={{
                name: '',
                username: '',
                email: '',
                password: '',
                confirmPassword: '',
              }}
              onSubmit={(values) => {
                const error = validateForm(values);
                if (error) {
                  handleMessage(error);
                  setSubmitting(false);
                } else {
                  handleSignup(values);
                }
              }}
            >
              {({ handleChange, handleBlur, handleSubmit, values }) => (
                <StyledFormArea>
                  <TextInput
                    label="Full Name"
                    icon="person"
                    placeholder="John Doe"
                    placeholderTextColor={darkLight}
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                    value={values.name}
                  />

                  <TextInput
                    label="Username"
                    icon="mention"
                    placeholder="johndoe"
                    placeholderTextColor={darkLight}
                    onChangeText={handleChange('username')}
                    onBlur={handleBlur('username')}
                    value={values.username}
                  />

                  <TextInput
                    label="Email Address"
                    icon="mail"
                    placeholder="example@gmail.com"
                    placeholderTextColor={darkLight}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    keyboardType="email-address"
                  />

                  <TextInput
                    label="Password"
                    icon="lock"
                    placeholder="********"
                    placeholderTextColor={darkLight}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    secureTextEntry
                  />

                  <TextInput
                    label="Confirm Password"
                    icon="lock"
                    placeholder="********"
                    placeholderTextColor={darkLight}
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={handleBlur('confirmPassword')}
                    value={values.confirmPassword}
                    secureTextEntry
                    returnKeyType="done"
                    onSubmitEditing={handleSubmit}
                  />

                  <MsgBox type={messageType}>{message}</MsgBox>

                  {!submitting && (
                    <StyledButton onPress={handleSubmit}>
                      <ButtonText>Sign Up</ButtonText>
                    </StyledButton>
                  )}

                  {submitting && (
                    <StyledButton disabled>
                      <Ionicons name="ellipse-outline" size={30} color={primary} />
                    </StyledButton>
                  )}

                  <Line />

                  <ExtraView>
                    <ExtraText>Already have an account? </ExtraText>
                    <TextLink onPress={() => router.push('/login')}>
                      <TextLinkContent>Login</TextLinkContent>
                    </TextLink>
                  </ExtraView>
                </StyledFormArea>
              )}
            </Formik>
          </InnerContainer>
        </ScrollView>
      </StyledContainer>
    </KeyboardAvoidingWrapper>
  );
};

export default Signup;
