import React, { useState } from 'react';
import { Formik } from 'formik';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import { HostURL } from '../../constants/URL.ts';
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper';
import ReviewInput from '../../components/ReviewInput.jsx';

import {
    StyledContainer,
    InnerContainer,
    PageTitle,
    MsgBox,
    StyledFormArea,
    StyledButton,
    ButtonText,
    StyledTextInput,
    StyledInputLabel,
    Line,
    LeftIcon,
    Colors,
} from '../../components/styles';

const { brand, darkLight } = Colors;

const AddBook = ({ navigation }) => {
    const [message, setMessage] = useState(null);
    const [messageType, setMessageType] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    const handleMessage = (message, type = 'FAILED') => {
        setMessage(message);
        setMessageType(type);
    };

    const createBook = async (values) => {
        const bookData = {
            isbn: values.isbn,
            title: values.title,
            author: values.author,
            published: values.published === 'Unknown publication date' ? null : values.published,
            description: values.description || 'No description available',
            coverLink: '',
        };

        try {
            const response = await axios.post(`${HostURL}/user/createManualBook`, bookData);
            const { status, message, data } = response.data;

            if (status === 'SUCCESS') {
                handleMessage('Book added successfully!', 'SUCCESS');
                navigation.navigate('ReviewPlotlineBook', { book: data });
            } else {
                handleMessage(message, 'FAILED');
            }
        } catch (error) {
            console.error(error);
            handleMessage('An error occurred. Please try again.', 'FAILED');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDateChange = (event, selectedDate, setFieldValue) => {
        setShowDatePicker(false);
        if (selectedDate) {
            setDate(selectedDate);
            setFieldValue('published', selectedDate.toISOString().split('T')[0]);
        }
    };

    const renderDatePicker = (setFieldValue) => (
        showDatePicker && (
            <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode="date"
                is24Hour={true}
                onChange={(event, selectedDate) => handleDateChange(event, selectedDate, setFieldValue)}
            />
        )
    );

    const renderInputField = (label, icon, placeholder, fieldProps, additionalProps = {}) => (
        <ReviewInput
            label={label}
            icon={icon}
            placeholder={placeholder}
            placeholderTextColor={darkLight}
            {...fieldProps}
            {...additionalProps}
        />
    );

    return (
        <KeyboardAvoidingWrapper>
            <StyledContainer>
                <ScrollView>
                    <InnerContainer>
                        <PageTitle>Add a New Book</PageTitle>
                        <Formik
                            initialValues={{
                                isbn: '',
                                title: '',
                                author: '',
                                published: '',
                                description: '',
                            }}
                            onSubmit={(values) => {
                                if (!values.isbn || !values.title || !values.author) {
                                    handleMessage('Please fill out all required fields.');
                                } else {
                                    setSubmitting(true);
                                    createBook(values);
                                }
                            }}
                        >
                            {({ handleChange, handleBlur, handleSubmit, values, setFieldValue }) => (
                                <StyledFormArea>
                                    {renderInputField('ISBN (Required)', 'barcode', 'Enter ISBN', {
                                        onChangeText: handleChange('isbn'),
                                        onBlur: handleBlur('isbn'),
                                        value: values.isbn,
                                    })}
                                    {renderInputField('Title (Required)', 'book', 'Enter title', {
                                        onChangeText: handleChange('title'),
                                        onBlur: handleBlur('title'),
                                        value: values.title,
                                    })}
                                    {renderInputField('Author (Required)', 'person', 'Enter author name', {
                                        onChangeText: handleChange('author'),
                                        onBlur: handleBlur('author'),
                                        value: values.author,
                                    }, { returnKeyType: 'done', onSubmitEditing: handleSubmit })}

                                    <View>
                                        <StyledInputLabel>Published Date</StyledInputLabel>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <LeftIcon>
                                                <Ionicons name="calendar" size={30} color={brand} />
                                            </LeftIcon>
                                            <TouchableOpacity
                                                style={{ flex: 1 }}
                                                onPress={() => setShowDatePicker(true)}
                                            >
                                                <StyledTextInput
                                                    placeholder="Select a date"
                                                    placeholderTextColor={darkLight}
                                                    value={values.published || date.toISOString().split('T')[0]}
                                                    editable={false}
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                    {renderInputField('Description', 'document-text', 'Enter description (optional)', {
                                        onChangeText: handleChange('description'),
                                        onBlur: handleBlur('description'),
                                        value: values.description,
                                    }, { returnKeyType: 'done', onSubmitEditing: handleSubmit })}

                                    <MsgBox type={messageType}>{message}</MsgBox>

                                    {!submitting ? (
                                        <StyledButton onPress={handleSubmit}>
                                            <ButtonText>Add Book/Review</ButtonText>
                                        </StyledButton>
                                    ) : (
                                        <Line />
                                    )}
                                </StyledFormArea>
                            )}
                        </Formik>
                    </InnerContainer>
                </ScrollView>
            </StyledContainer>
            {renderDatePicker()}
        </KeyboardAvoidingWrapper>
    );
};

export default AddBook;
