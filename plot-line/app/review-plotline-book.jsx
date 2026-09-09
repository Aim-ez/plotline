import React, {useState, useContext} from 'react';
import { ScrollView } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Formik } from 'formik';
import axios from 'axios';

import { CredentialsContext } from '../components/CredentialsContext.jsx'
import { HostURL } from '../constants/URL.js';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import { checkReviewExists } from '../hooks/userReviewLogic.js';
import ReviewInput from '../components/TextInput'; // Reusable TextInput Component

import {
    StyledContainer,
    InnerContainer,
    PageTitle,
    MsgBox,
    SubTitle,
    StyledFormArea,
    StyledButton,
    ButtonText,
    Line,
    PageLogo,
    Colors,
} from '../components/styles';

const {darkLight} = Colors;

const ReviewPlotlineBook = () => {
    const reviewurl = HostURL + "/user/createReview"
    const { book } = useLocalSearchParams();

    const currentDate = new Date().toISOString();


    //context -> will be important later
    const { storedCredentials } = useContext(CredentialsContext);
    const { _id } = storedCredentials || {};
    const title = book?.title || "No Title Available";  // Default title if missing



    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();
    const [submitting, setSubmitting] = useState();

   

    const handleCreateReview = async (reviewInfo) => {
        handleMessage(null); // Reset error message
        const {rating, description } = reviewInfo;

        const formData = {
            rating,
            description,
            date: currentDate,
            userId: _id,
            bookId: book._id
        }

        try {     
            // check if user has already reviewed this book
            const reviewExists = await checkReviewExists(_id, book._id);

            if (reviewExists == true) {
                handleMessage("You have already reviewed this book!", 'FAILED');
                setSubmitting(false);
            } else if (reviewExists == false) {
                const response = await axios.post(reviewurl, formData)
                const result = response.data;
                const {message, status} = result;

                if (status != 'SUCCESS') {
                    handleMessage(message, status);
                    setSubmitting(false);
                } else { 
                    handleMessage("Review created succesfully!", 'SUCCESS')
                    router.replace('/home')
                    console.log("REVIEW CREATION SUCCESSFUL")
                }
            }
        } catch (error) {
                console.log(error);
                setSubmitting(false);
                handleMessage("An error occured. Check your network and try again.");
            
        }
    }

    const handleMessage = (message, type = 'FAILED') => {
        setMessage(message);
        setMessageType(type);
    }

    return (
        <KeyboardAvoidingWrapper>
            <StyledContainer>
                <ScrollView>
                    <InnerContainer>
                        <PageLogo source={require('../assets/images/PlotLogo.png')}/>
                        <PageTitle>Reviewing:</PageTitle>
                        <SubTitle>{title}</SubTitle>
                        <Formik
                            initialValues={{rating: '', description: ''}}
                            onSubmit={(values) => {
                                const numericRating = Number(values.rating)
                                if (!Number.isInteger(numericRating)) {
                                    handleMessage('You must enter a number for the rating (Decimals not allowed).');
                                    setSubmitting(false);
                                } else if (
                                    values.rating == '' || values.rating > 5 || values.rating < 1
                                ) {
                                    handleMessage('Please enter a rating out of 5 (minimum 1).');
                                    setSubmitting(false);
                                } else {
                                    setSubmitting(true);
                                    handleCreateReview(values);
                                }
                            }}
                        >{({handleChange, handleBlur, handleSubmit, values}) => (<StyledFormArea>
                            <ReviewInput 
                                label="Rating (out of 5)"
                                icon="star"
                                placeholder="3"
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('rating')}
                                onBlur={handleBlur('rating')}
                                value={values.rating}
                                returnKeyType="done"
                                onSubmitEditing={handleSubmit} // Submit the form
                            />
                            <ReviewInput
                                label="Review"
                                icon="book"
                                placeholder="Enter review message here...(optional)"
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('description')}
                                onBlur={handleBlur('description')}
                                value={values.description}
                                returnKeyType="done"
                                onSubmitEditing={handleSubmit} // Submit the form
                            />
                            <MsgBox type={messageType}>{message}</MsgBox>
                            {!submitting && (
                                <StyledButton onPress={handleSubmit}>
                                    <ButtonText>Submit Review</ButtonText>
                                </StyledButton>
                            )}
                            {submitting && (
                                <Line />
                            )}
                           
                        </StyledFormArea>)}
                        </Formik>
                    </InnerContainer>
                </ScrollView>
            </StyledContainer>
        </KeyboardAvoidingWrapper>
    );
}

export default ReviewPlotlineBook;

