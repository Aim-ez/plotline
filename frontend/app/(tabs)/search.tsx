// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'

// const Search = () => {
//   return (
//     <View>
//       <Text>Search</Text>
//     </View>
//   )
// }

// export default Search

// const styles = StyleSheet.create({})

//figuring out commits
import { StyleSheet, Text, TextInput, View, FlatList, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

interface Book {
  id: string
  volumeInfo: {
    title: string
    authors?: string[]
  }
}

const GOOGLE_BOOKS_API = 'https://www.googleapis.com/books/v1/volumes'

const Search = () => {
  const [query, setQuery] = useState<string>('')
  const [books, setBooks] = useState<Book[]>([])

  const fetchBooks = async () => {
    try {
      const response = await fetch(`${GOOGLE_BOOKS_API}?q=${query}&key=AIzaSyA4Z1Qm7N2_6AnPLHOtS577y4-nV_NrAb8`)
      const data = await response.json()
      setBooks(data.items)
    } catch (error) {
      console.error('Error fetching books:', error)
    }
  }

  const renderBookItem = ({ item }: { item: Book }) => (
    <TouchableOpacity style={styles.bookItem}>
      <Text style={styles.bookTitle}>{item.volumeInfo.title}</Text>
      <Text style={styles.bookAuthor}>{item.volumeInfo.authors?.join(', ')}</Text>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Plotline</Text>
      <TextInput
        style={styles.input}
        placeholder="Search for books..."
        value={query}
        onChangeText={setQuery}
      />
      <TouchableOpacity onPress={fetchBooks} style={styles.searchButton}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>
      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={renderBookItem}
        style={styles.results}
      />
    </View>
  )
}

export default Search

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EFEBF9',
    padding: 20,
  },
  logo: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#798CE7',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#A574D5',
    borderWidth: 1,
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  searchButton: {
    backgroundColor: '#798CE7',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  results: {
    width: '100%',
  },
  bookItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  bookAuthor: {
    fontSize: 14,
    color: '#666',
  },
})
//



