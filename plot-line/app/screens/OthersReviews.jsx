import React, {useEffect, useState} from 'react';
import { FlatList } from 'react-native';
import axios from 'axios';

import { HostURL } from '../../constants/URL.ts'

import {
    StyledContainer,
    InnerContainer,
    PageTitle,
    Line,
    ReviewBox,
    ReviewText,
    ExtraText,
    StyledButton,
    ButtonText
} from '../../components/styles';
import { formatDate } from '../../hooks/formatDate.js';

function OthersReviews({route, navigation}) {
    const { userId, handle } = route.params;

    const url = HostURL + "/user/getReviews";
    const bookurl = HostURL + "/user/getBookData";

    const [allReviewData, setReviewData] = useState([]);

    const getAllData = async () => {
        try {
            const res = await axios.get(url, { params: { userId } });
            setReviewData(res.data.data);
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    };

    useEffect(() => {
        getAllData(); 
    }, [userId]);


    const Rev = ({ review }) => {
        const [bookData, setBookData] = useState(null);

        useEffect(() => {
            // Fetch book data when the component mounts
            const fetchBookData = async () => {
                try {
                    const res = await axios.get(bookurl, { params: { bookId: review.bookId } });
                    setBookData(res.data.data);  // Set book data
                } catch (error) {
                    console.error("Error fetching book data", error);
                }
            };

            fetchBookData();
        }, [review.bookId]); // Re-fetch if bookId changes

        if (!bookData) {
            return <ReviewText>Loading book details...</ReviewText>;
        }

        const handlePress = () => {
            navigation.navigate('BookDetails', { book: bookData, fromReview: true})
        }

        return (
            <ReviewBox onPress={handlePress}>
                <ReviewText date={true}>{formatDate(review.date)}</ReviewText>
                <ReviewText>Book: {bookData.title}</ReviewText>
                <ReviewText>Author: {bookData.author}</ReviewText>
                <ReviewText>Rating: {review.rating}</ReviewText>
                <ReviewText>"{review.description}"</ReviewText>
            </ReviewBox>
        )
    };

    const numberOfReviews = allReviewData.length;

    const goToProfile = () => {
        navigation.navigate('OthersProfile', {userId: userId, username: handle})
    }


    return (
            <StyledContainer>
                <InnerContainer>
                    <PageTitle>@{handle.toLowerCase()}'s Reviews</PageTitle>
                    <Line></Line>
                    {numberOfReviews > 0 ? (
                        <>
                            <ExtraText>Total Reviews: {numberOfReviews}</ExtraText>
                             <FlatList 
                            data={allReviewData}
                            keyExtractor={item => item._id}
                            renderItem={({item}) => (<Rev review={item}/>)}
                        />
                        </>
                    ) : (
                        <ExtraText>@{handle} doesn't have any reviews yet!</ExtraText>
                    )}
                    <StyledButton onPress={() => goToProfile()}>
                        <ButtonText>See @{handle.toLowerCase()}'s Profile</ButtonText>
                    </StyledButton>
                </InnerContainer>
            </StyledContainer>
    );
}

export default OthersReviews;

