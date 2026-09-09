import React, { useEffect, useState} from 'react';
import { FlatList } from 'react-native';
import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';
import { HostURL } from '../constants/URL.js'

import {
    StyledContainer,
    InnerContainer,
    PageTitle,
    Line,
    ReviewBox,
    ReviewText,
    ExtraText,
} from '../components/styles';
import { formatDate } from '../hooks/formatDate.js';


function PlotlineBookReviews() {
    const { book: bookParam } = useLocalSearchParams();
    const book = JSON.parse(bookParam);

    const bookId = book._id;

    const url = HostURL + "/user/getBookReviews";

    const [allReviewData, setReviewData] = useState([]);

    const getAllData = async () => {
        try {
            const res = await axios.get(url, { params: { bookId } });
            setReviewData(res.data.data);
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    };

    useEffect(() => {
        getAllData(); 
    }, [bookId]);

    const Rev = ({ review }) => {
        return (
            <ReviewBox disabled={true}>
                <ReviewText date={true}>{formatDate(review.date)}</ReviewText>
                <ReviewText>Book: {book.title}</ReviewText>
                <ReviewText>Author: {book.author}</ReviewText>
                <ReviewText>Rating: {review.rating}</ReviewText>
                <ReviewText>"{review.description}"</ReviewText>
            </ReviewBox>
        )
    };

    const numberOfReviews = allReviewData.length;


    return (
            <StyledContainer>
                <InnerContainer>
                    <PageTitle>Reviews for {book.title}</PageTitle>
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
                        <ExtraText>{book.title} doesn't have any reviews yet!</ExtraText>
                    )}
                </InnerContainer>
            </StyledContainer>
    );
}

export default PlotlineBookReviews;

