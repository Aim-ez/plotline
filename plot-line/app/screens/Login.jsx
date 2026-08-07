import React, { useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Formik } from 'formik';
import axios from 'axios';

import { CredentialsContext } from '../../components/CredentialsContext';
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper';
import { HostURL } from '../../constants/URL';
import TextInput from '../../components/TextInput'; // Reusable TextInput Component

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
  TextLinkContent
} from '../../components/styles';

const { darkLight, primary } = Colors;

const Login = ({ navigation }) => {
  const url = HostURL + "/user/login";

  const [hidePassword, setHidePassword] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();

  const { setStoredCredentials } = useContext(CredentialsContext);

  // Helper functions
  const handleMessage = (message, type = 'FAILED') => {
    setMessage(message);
    setMessageType(type);
  };

  const persistLogin = (credentials, message, status) => {
    AsyncStorage.setItem('plotlineCredentials', JSON.stringify(credentials))
      .then(() => {
        handleMessage(message, status);
        setStoredCredentials(credentials);
      })
      .catch((error) => {
        console.error(error);
        handleMessage('Persisting login failed');
      });
  };

  const handleLogin = (credentials) => {
    handleMessage(null); // Reset error message

    // Convert email to lowercase for case-insensitive comparison
    const normalizedCredentials = {
      ...credentials,
      email: credentials.email.toLowerCase(),
    };

    axios
      .post(url, normalizedCredentials)
      .then((response) => {
        const result = response.data;
        const { message, status, data } = result;

        if (status !== 'SUCCESS') {
          handleMessage(message, status);
        } else {
          console.log('LOGIN SUCCESSFUL');
          persistLogin(data[0], message, status); // IF DOING GOOGLE SIGN IN, REWATCH KEEPING USER LOGGED IN
        }
        setSubmitting(false);
      })
      .catch((error) => {
        console.log(error);
        setSubmitting(false);
        handleMessage('An error occurred. check your network and try again.');
      });
  };

  return (
    <KeyboardAvoidingWrapper>
      <StyledContainer>
        <ScrollView>
          <InnerContainer>
            <PageLogo source={require('../../assets/images/PlotLogo.png')} />
            <PageTitle testID="Header">Login</PageTitle>
            <SubTitle>Login to Your Account</SubTitle>
            <Formik
              initialValues={{ email: '', password: '' }}
              onSubmit={(values) => {
                if (!values.email || !values.password) {
                  handleMessage('Please fill in all the fields');
                  setSubmitting(false);
                } else {
                  setSubmitting(true);
                  handleLogin(values);
                }
              }}
            >
              {({ handleChange, handleBlur, handleSubmit, values }) => (
                <StyledFormArea>
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
                    placeholder="* * * * * * * * * * * * *"
                    placeholderTextColor={darkLight}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    secureTextEntry={hidePassword}
                    isPassword
                    hidePassword={hidePassword}
                    setHidePassword={setHidePassword}
                    returnKeyType="done"
                    onSubmitEditing={handleSubmit}
                  />
                  <MsgBox type={messageType}>{message}</MsgBox>
                  {!submitting && (
                    <StyledButton testID='login-button' onPress={handleSubmit}>
                      <ButtonText>Login</ButtonText>
                    </StyledButton>
                  )}
                  {submitting && (
                    <StyledButton testID='login-button' disabled={true}>
                      <Ionicons name={'ellipse-outline'} size={30} color={primary} />
                    </StyledButton>
                  )}
                  <Line />
                  <ExtraView>
                    <ExtraText>Don't have an account already?</ExtraText>
                    <TextLink onPress={() => navigation.navigate('Signup')}>
                      <TextLinkContent>Signup</TextLinkContent>
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

export default Login;