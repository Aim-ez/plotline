import React, { useContext, useEffect, useState, useCallback } from 'react';
import { FlatList } from 'react-native';
import axios from 'axios';
import { router } from 'expo-router';
import { CredentialsContext } from '../components/CredentialsContext';
import { HostURL } from '../constants/URL.js';

import {
    StyledContainer,
    InnerContainer,
    PageTitle,
    Line,
    ReviewBox,
    ReviewText,
    ExtraText,
} from '../components/styles';
import { formatDate } from '../hooks/formatDate';

const UserReviews = () => {
    const reviewsUrl = `${HostURL}/user/getReviews`;
    const bookDataUrl = `${HostURL}/user/getBookData`;

    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    // Context data
    const { storedCredentials } = useContext(CredentialsContext);
    const { _id } = storedCredentials || {};

    // Fetch all reviews
    const fetchReviews = useCallback(async () => {
        try {
            const response = await axios.get(reviewsUrl, { params: { userId: _id } });
            setReviews(response.data.data || []);
        } catch (error) {
            console.error('Error fetching reviews:', error);
        } finally {
            setLoading(false);
        }
    }, [_id]);

    useEffect(() => {
        fetchReviews();
    }, [fetchReviews]);

    // Render a single review
    const ReviewItem = ({ review }) => {
        const [bookData, setBookData] = useState(null);

        useEffect(() => {
            const fetchBookData = async () => {
                try {
                    const response = await axios.get(bookDataUrl, { params: { bookId: review.bookId } });
                    setBookData(response.data.data);
                } catch (error) {
                    console.error('Error fetching book data:', error);
                }
            };

            fetchBookData();
        }, [review.bookId]);

        if (!bookData) return <ReviewText>Loading book details...</ReviewText>;

        const handlePress = () => {
            router.push({
                pathname: '/book-details',
                params: {
                    book: JSON.stringify(bookData),
                    fromReview: 'true',
                },
            });
        };

        return (
            <ReviewBox onPress={handlePress}>
                <ReviewText date>{formatDate(review.date)}</ReviewText>
                <ReviewText>Book: {bookData.title}</ReviewText>
                <ReviewText>Author: {bookData.author}</ReviewText>
                <ReviewText>Rating: {review.rating}</ReviewText>
                <ReviewText>"{review.description}"</ReviewText>
            </ReviewBox>
        );
    };

    return (
        <StyledContainer>
            <InnerContainer>
                <PageTitle>Your Reviews</PageTitle>
                <Line />

                {loading ? (
                    <ExtraText>Loading your reviews...</ExtraText>
                ) : reviews.length > 0 ? (
                    <>
                        <ExtraText>Total Reviews: {reviews.length}</ExtraText>
                        <FlatList
                            data={reviews}
                            keyExtractor={(item) => item._id}
                            renderItem={({ item }) => <ReviewItem review={item} />}
                        />
                    </>
                ) : (
                    <ExtraText>You don't have any reviews yet!</ExtraText>
                )}
            </InnerContainer>
        </StyledContainer>
    );
};

export default UserReviews;
