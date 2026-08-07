import React, { useState, useContext, useEffect} from 'react';

// async storage
import AsyncStorage  from '@react-native-async-storage/async-storage'

// credntials context
import { CredentialsContext } from '../../components/CredentialsContext.jsx'

import { Ionicons } from '@expo/vector-icons';

import {
    StyledContainer,
    InnerContainer,
    PageTitle,
    SubTitle,
    PageLogo, 
    HeaderImage,
    BookContainer,
    BookCoverImage,
    BookInfo,
    ReviewText,
    BookText,
    AuthorText,
    ExtraText,
    Line,
    DeleteIcon,
    Colors
} from '../../components/styles';
import { ScrollView, ActivityIndicator, FlatList } from 'react-native';
import { HostURL } from '../../constants/URL.js';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const {red} = Colors;

const ReadingList = ({navigation}) => {
    //context -> will be important later
    const { storedCredentials } = useContext(CredentialsContext);
    const { _id } = storedCredentials;
    const getListURL = HostURL + "/user/getReadingList"
    const removeListURL = HostURL + "/user/removeFromReadingList"
    const nav = useNavigation();

    const [readingList, setReadingList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = nav.addListener('tabPress', () => {
            fetchReadingList();
        });
    
        return unsubscribe; // Cleanup listener
      }, [nav]);


    //Fetch reading list
    useEffect(() => {
        fetchReadingList();
    }, [_id]);

    const fetchReadingList = async() => {
        try {
            const response = await axios.get(getListURL, {params: { userId: _id}})
            
            if (response.data.status === "SUCCESS") {
                setReadingList(response.data.data.books);
            } else {
                Alert.alert('Error', response.data.message || 'Failed to fetch reading list.');
            }
        } catch (error) {
            console.error(error)
            Alert.alert('Error', 'An error occurred when fetching the reading list');
        } finally {
            setLoading(false);
        }
    };

    //Render header section
    const renderHeader = () => (
        <InnerContainer>
            <PageTitle>Your Reading List</PageTitle>
        </InnerContainer>
    )

    const goToDetails = (book) => {
        navigation.navigate('BookDetails', { book: book, fromReview: true})
    }

    const removeBook = async(book) => {
        const dataToSend = {
            userId: _id,
            book: book,
          }

        const response = await axios.post(removeListURL, dataToSend)
        if (response.data.status === "SUCCESS") {
            fetchReadingList();
        } else {
            console.error("Error deleting book in reading-list.jsx")
        }
    }

    // Render each book item
    const renderBook = ({ item }) => (
        <BookContainer onPress={() => goToDetails(item)}>
            <BookCoverImage readlist={true} source={{uri: item.coverLink}}/>
            <BookInfo>
                <BookText>{item.title}</BookText>
                <AuthorText>{item.author}</AuthorText>
                <ExtraText readlist={true} numberOfLines={2}>{item.description}</ExtraText>
                <DeleteIcon onPress={() => removeBook(item)}>
                    <Ionicons name="trash" color={red}/>
                </DeleteIcon>
            </BookInfo>
        </BookContainer>
    )

    return (
            <StyledContainer>
                {renderHeader()}
                <Line></Line>
                {loading ? (
                <ActivityIndicator size="large" color="#007BFF" />
            ) : readingList.length === 0 ? (
                <SubTitle>Your reading list is empty!</SubTitle>
            ) : (
                <FlatList
                    data={readingList}
                    keyExtractor={(item) => item.isbn}
                    renderItem={renderBook}
                />
            )}
            </StyledContainer>
    );
}

export default ReadingList;

