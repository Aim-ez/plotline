import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { HostURL } from '../constants/URL';

const BACKEND_URL = HostURL;

const useFetchBooks = (query, selectedGenre, selectedLanguage, sortOrder) => {
  const [books, setBooks] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [hasSearched, setHasSearched] = useState(false);

  const debounceTimer = useRef(null);

  const fetchBooks = async () => {
    const normalizedQuery = query || "2";  // Replace with a known book if query is empty
    const isbn = "2"; // Example ISBN, replace with real data
    const author = "2"; // Example author, replace with real data
    console.log("Testing with known book details:", normalizedQuery, isbn, author);

    if (!normalizedQuery || !isbn || !author) {
      console.warn("Query or ISBN or Author is missing. Skipping fetch.");
      return;
    }

    try {
      console.log("Starting fetchBooks process...");
      console.log("Normalized Query:", normalizedQuery);

      // Check if the book exists in the database using title, ISBN, and author
      const bookExistsResponse = await axios.get(`${BACKEND_URL}/user/bookExistsByDetails`, {
        params: { title: normalizedQuery, isbn, author },
      });

      console.log("BookExists Response:", bookExistsResponse.data);

      const bookId = bookExistsResponse.data?.bookId;

      if (bookId) {
        console.log(`Book found with ID: ${bookId}. Fetching book details...`);

        const bookDetailsResponse = await axios.get(`${BACKEND_URL}/user/getBookData`, {
          params: { bookId },
        });

        console.log("BookDetails Response:", bookDetailsResponse.data);

        const bookDetails = bookDetailsResponse.data.data;
        setBooks([bookDetails]);
        setTotalResults(1);
      } else if (bookExistsResponse.data === null) {
        // Log only if the response is explicitly null
        console.log("Book does not exist in the database.");
        setBooks([]);
        setTotalResults(0);
      }

      setHasSearched(true);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      fetchBooks();
    }, 500); // Adjust the debounce time as needed

    // Cleanup debounce timer on unmount or when dependencies change
    return () => clearTimeout(debounceTimer.current);
  }, [selectedGenre, selectedLanguage, sortOrder]);

  return { books, totalResults, hasSearched, fetchBooks };
};

export default useFetchBooks;

