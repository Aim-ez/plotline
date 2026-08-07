import React, { useContext, useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native';
import axios from 'axios';
import { HostURL } from '../../constants/URL.js';

import { CredentialsContext } from '../../components/CredentialsContext.jsx';

import {
    StyledContainer,
    InnerContainer,
    PageTitle,
    SubTitle,
    StyledButton,
    ButtonText,
    Line,
    ExtraText,
    BookContainer,
    BookCoverImage,
    BookInfo,
    BookText,
    AuthorText
} from '../../components/styles';

const Profile = ({ route, navigation }) => {
    const {userId, username} = route.params;
    const [favorite, setFavorite] = useState(false);
    const getFavURL = HostURL + "/user/getFavourite";
    const getBookURL = HostURL + "/user/getBook";
    const getAboutMeURL = HostURL + "/user/getAboutMe";
    const getPrivacyURL = HostURL + "/user/getPrivacyStatus";
    const getCurrentURL = HostURL + "/user/getCurrentlyReading";

    const [aboutMe, setAboutMe] = useState('');
    const [isPrivate, setIsPrivate] = useState(true); //default to private at first
    const [currentlyReading, setCurrentlyReadingList] = useState([]);



    useEffect(() => {
        fetchFavorite();
        fetchAboutMe();
        fetchPrivacyStatus();
        fetchCurrentlyReadingList();

    }, [userId]);

    const fetchFavorite = async () => {
        try {
            const response = await axios.get(getFavURL, { params: { userId: userId } });
    
            if (response.data.status === "SUCCESS" && response.data.data) {
                const favoriteBookId = response.data.data;
    
                const bookResponse = await axios.get(getBookURL, { params: { bookId: favoriteBookId } });
                if (bookResponse.data.status === "SUCCESS") {
                    setFavorite(bookResponse.data.data); // Store the full book object
                }
           }
        } catch (error) {
            console.error("Error fetching favorite book:", error);
        }
    };

    const fetchAboutMe = async () => {
        try {
            const response = await axios.get(getAboutMeURL, { params: { userId: userId } });
            if (response.data.status === "SUCCESS") {
                setAboutMe(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching 'About Me':", error);
        }
    };

    const fetchPrivacyStatus = async () => {
        try {
            const response = await axios.get(getPrivacyURL, { params: { userId: userId } });
            if (response.data.status === "SUCCESS") {
                setIsPrivate(response.data.data); // Set initial privacy status
            }
        } catch (error) {
            console.error("Error fetching privacy status:", error);
        }
    };

    const fetchCurrentlyReadingList = async () => {
        try {
            const response = await axios.get(getCurrentURL, { params: { userId: userId } });

            if (response.data.status === 'SUCCESS') {
                setCurrentlyReadingList(response.data.data.books); // Update your state with fetched data
            } else {
                console.log(response.data.message); // Log any "no books" message or warnings
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                return;  // User has never added something to their currently reading list
            }
            console.error('Error fetching Currently Reading list:', error);
        }
    };

    const goToDetails = (book) => {
        navigation.navigate('BookDetails', { book: book, fromReview: true})
    }

    // Render sections to keep JSX clean
    const renderFavourite = () => (
        <InnerContainer>
            <SubTitle>My Favourite Book</SubTitle>
            {renderBook(favorite)}
        </InnerContainer>
    );

    const renderStatus = (status) => (
        <AuthorText italic={true}>{status}</AuthorText>
    )

    const renderBook = (bookSent, isCurr) => {
        if (!bookSent) {
            return <ExtraText>No favorite book found.</ExtraText>;
        }
        let status = null
        let book = bookSent

        if (isCurr) {
            status = book.status
            book = bookSent.book
        }

        return (
            <BookContainer onPress={() => goToDetails(book)}>
                <BookCoverImage readlist={true} source={{ uri: book.coverLink }} />
                <BookInfo>
                    {isCurr ? renderStatus(status) : null}
                    <BookText>{book.title}</BookText>
                    <AuthorText>{book.author}</AuthorText>
                    <ExtraText readlist={true} numberOfLines={2}>{book.description}</ExtraText>
                </BookInfo>
            </BookContainer>
        );
    };

    const renderAboutMe = () => (
        <InnerContainer>
            <SubTitle>About Me</SubTitle>
            <ExtraText>{aboutMe || `...`}</ExtraText>
        </InnerContainer>
    );

    const renderCurrentlyReading = () => (
        <InnerContainer>
            <SubTitle>Currently Reading</SubTitle>
            {currentlyReading.length > 0 ? (
                currentlyReading.map((book) => (
                    <React.Fragment key={book._id}>
                        {renderBook(book, true)}
                    </React.Fragment>
                ))
            ) : (
                <ExtraText>@{username} isn't currently reading anything!</ExtraText>
            )}
        </InnerContainer>
    );

    const renderProfile = () => (
        <>
            <Line thick={true} />
            {renderAboutMe()}
            <Line />
            {renderFavourite()}
            <Line />
            {renderCurrentlyReading()}
        </>
    )

    const renderPrivate = () => (
        <InnerContainer>
            <SubTitle>This account is set to private.</SubTitle>
        </InnerContainer>
    )
    

    return (
        <ScrollView>
            <StyledContainer>
                <PageTitle>@{username}'s Profile</PageTitle>
                {isPrivate ? renderPrivate() : renderProfile()}
            </StyledContainer>
        </ScrollView>
    );
};

export default Profile;
