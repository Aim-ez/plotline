
import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, View, Modal, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import useFetchBooks from '../../hooks/useFetchBooks';  // Import the custom hook

import {
  StyledContainer,
  InnerContainer,
  PageTitle,
  Line,
  SearchBar,
  StyledButton,
  ButtonText,
  ReviewBox,
  BookText,
  AuthorText,
  RightIcon,
  ModalContainer,
  ModalInnerContainer,
  SubTitle,
  SectionTitle,
  FilterOption,
  FilterText,
} from '../../components/styles';

const Search = ({ navigation }) => {
  const [query, setQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [resultsPerPage] = useState(35); // Set results per page to 35

  const { books, totalResults, hasSearched, fetchBooks } = useFetchBooks(
    query, selectedGenre, selectedLanguage, resultsPerPage, sortOrder
  );

const router = useRouter();

 // useEffect(() => {
    // Reset filters and trigger fetchBooks when tab is pressed
   // const unsubscribe = nav.addListener('tabPress', () => {
     // setQuery('');
      //setSelectedGenre('');
      //setSelectedLanguage('');
      //setSortOrder('');
      //if (query.trim()) { // Only trigger fetchBooks if the query is non-empty
        //fetchBooks(); // EDIT: Added check for non-empty query
      //}
   // });

    //return unsubscribe; // Cleanup listener
  //}, [nav]);

  useEffect(() => {
    // Trigger fetchBooks whenever filters change
    if (query.trim()) { // EDIT: Added check for non-empty query
      fetchBooks();
    }
  }, [selectedGenre, selectedLanguage, sortOrder]);

  const clearFilters = () => {
    setSelectedGenre('');
    setSelectedLanguage('');
    setSortOrder('');
  };

  const handleSearch = () => {
    if (query.trim()) { // Only trigger fetchBooks if the query is non-empty
      fetchBooks(); // EDIT: Added check for non-empty query
    }
  } // Trigger fetchBooks when search is submitted

  const renderBookItem = ({ item }) => (
    <ReviewBox onPress={() => navigation.navigate('BookDetails', { book: item, fromReview: false })}>
      <BookText>{item.volumeInfo.title}</BookText>
      <AuthorText>{item.volumeInfo.authors?.join(', ')}</AuthorText>
    </ReviewBox>
  );

  const genres = ['Fiction', 'Non-Fiction', 'Poetry', 'Fantasy'];

  const applyFilters = () => {
    // Apply filters and close modal
    setModalVisible(false);
    // No need to explicitly call fetchBooks as it's handled in the useEffect
  };

  return (
    <StyledContainer>
      <InnerContainer>
        <RightIcon filter={true} onPress={() => setModalVisible(true)}>
          <Ionicons name={'filter'} size={30} />
        </RightIcon>

        <PageTitle>Search</PageTitle>
        <Line />

        <SearchBar
          search={true}
          placeholder="Search for books or authors..."
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSearch} // Trigger fetchBooks on "Enter" or "Done"
          returnKeyType="search" // Customize the keyboard action button
        />

        <RightIcon search={true} onPress={handleSearch}>
          <Ionicons name={'search'} size={30} />
        </RightIcon>

        <InnerContainer>
          <FlatList
            data={books}
            keyExtractor={(item, index) => `${item.id}-${index}`} // Ensures unique keys
            renderItem={renderBookItem}
            style={styles.results}
          />
          {hasSearched && (
            <StyledButton onPress={() => navigation.navigate('addManualBook')}>
              <ButtonText>Can't Find What You're Looking For?</ButtonText>
            </StyledButton>
          )}
        </InnerContainer>
      </InnerContainer>

      {/* Filter Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <ModalContainer>
          <ModalInnerContainer>
            <SubTitle style={styles.modalTitle}>Select Filters</SubTitle>

            {/* Genre Selection */}
            <SectionTitle>Genre</SectionTitle>
            <FlatList
              key={modalVisible ? 'open' : 'closed'}
              data={genres}
              keyExtractor={(item) => `genre-${item}`} // Unique keys for genres
              renderItem={({ item: genre }) => (
                <FilterOption
                  onPress={() => setSelectedGenre(genre)}
                  chosen={selectedGenre === genre}
                >
                  <FilterText chosen={selectedGenre === genre}>{genre}</FilterText>
                </FilterOption>
              )}
              style={styles.genreList}
            />

            {/* Language Selection */}
            <SectionTitle>Language</SectionTitle>
            <View style={styles.selectionRow}>
              <FilterOption
                onPress={() => setSelectedLanguage('en')}
                chosen={selectedLanguage === 'en'}
              >
                <FilterText chosen={selectedLanguage === 'en'}>English</FilterText>
              </FilterOption>
              <FilterOption
                onPress={() => setSelectedLanguage('fr')}
                chosen={selectedLanguage === 'fr'}
              >
                <FilterText chosen={selectedLanguage === 'fr'}>French</FilterText>
              </FilterOption>
            </View>

            {/* Sorting Selection */}
            <SectionTitle>Sort By</SectionTitle>
            <View style={styles.selectionRow}>
              <FilterOption
                onPress={() => setSortOrder('A-Z')}
                chosen={sortOrder === 'A-Z'}
              >
                <FilterText chosen={sortOrder === 'A-Z'}>Alphabetically A-Z</FilterText>
              </FilterOption>
              <FilterOption
                onPress={() => setSortOrder('Z-A')}
                chosen={sortOrder === 'Z-A'}
              >
                <FilterText chosen={sortOrder === 'Z-A'}>Alphabetically Z-A</FilterText>
              </FilterOption>
            </View>

            {/* Modal Buttons */}
            <View style={styles.modalButtons}>
              <Button
                title="Apply Filters"
                onPress={applyFilters} // Apply filters and close modal
              />
              <Button
                title="Clear Filters"
                onPress={clearFilters} // Clear filters and fetch books
                color="orange"
              />
              <Button
                title="Close"
                onPress={() => setModalVisible(false)} // Just close the modal
                color="grey"
              />
            </View>
          </ModalInnerContainer>
        </ModalContainer>
      </Modal>
    </StyledContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  results: {
    width: '100%',
  },
  genreList: {
    maxHeight: 150,
    paddingBottom: 10,
  },
  selectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default Search;
