import {gql} from '@apollo/client'


// Query, Mutation & Subscription for BOOK
const BOOK_DETAILS = gql`
  fragment BookDetails on Books {
    title
    published
    author{
      name
    }
    genres
    id
  }
`

export const ALL_BOOKS = gql`
  query bookByGenre($genre: String){
    allBooks(genre: $genre) {
      ...BookDetails
    }
  }

  ${BOOK_DETAILS}

`

export const GET_GENRES = gql`
  query {
    allBooks {
      genres
    }
  }
`

export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $published: Int, $author: String!, $genres: [String!]!) {
    addBook (
    title: $title,
    published: $published,
    author: $author,
    genres: $genres
    ) {
      title
      published
      genres
    }
  }
`

export const BOOK_ADDED = gql`
 subscription{
  bookAdded {
    title
    genres
    published
  }
}
`

// =========== AUTHORS ========== //
//
export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
`

export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor (
      name: $name,
      setBornTo: $setBornTo
    ) {
      name
      born
      bookCount
      id
    }
  }
`

// ========== USER ============= //
//
export const LOGIN = gql`
 mutation login($username: String!, $password:String!){
    login (
      username: $username,
      password: $password
    ) {
      value
    }
 }
`

export const LOGGEDIN_USER = gql`
  query {
  me {
    username
    favoriteGenres
    id
  }
}
`
