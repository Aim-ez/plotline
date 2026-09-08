import {useEffect, useState} from 'react';
import axios from 'axios';
import { router, useLocalSearchParams } from 'expo-router';
import { HostURL } from '../constants/URL.ts'

import { renderReviewMessage } from '../components/ReviewMessage.jsx';


const GoogleBookReviews = () => {
    const { book } = useLocalSearchParams();

    const existsurl = HostURL + "/user/bookExists";
    const getbookurl = HostURL + "/user/getBookData";

    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(null);
    const [ reviews, setReviews ] = useState(null);

    const checkPlotBookExists= async () => {
        const title = book.volumeInfo.title;
        const author = book.volumeInfo.authors?.join(', ')
        const isbn = book.volumeInfo?.industryIdentifiers?.find(identifier => identifier.type === "ISBN_13")?.identifier 
        || book.volumeInfo?.industryIdentifiers?.find(identifier => identifier.type === "ISBN_10")?.identifier
        || null;    


        try {
            const response = await axios.get(existsurl, {params:
                {
                    title: title,
                    author: author,
                    isbn: isbn
                }
            })

            if (response.data.status == 'NOT FOUND') {
                setReviews(renderReviewMessage("This book doesn't have any reviews yet!"));
            } else if (response.data.status == 'FOUND') {
                const bookId = response.data.data.bookId
                const res = await axios.get(getbookurl, {params: {bookId: bookId}})
                const plotBookInfo = res.data.data;
                router.replace({
                    pathname: '/plotline-book-reviews',
                    params: {
                        book: JSON.stringify(plotBookInfo),
                    },
                });
            } else {
                console.error('Error checking if plot book exists', response.data);
                setError("An error occured. Check your network and try again.");
            }
        } catch (error) {
            console.log(error);
            setError("An error occurred. Check your network and try again.")
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        checkPlotBookExists();
    }, []);

    if (loading) {
        renderReviewMessage("Loading...")
    }

    if (error) {
        renderReviewMessage({error});
    }

    return reviews;
}

export default GoogleBookReviews;

