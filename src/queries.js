import { gql } from '@apollo/client'


export const ALL_AUTHORS = gql`
  query{
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
`


export const ALL_BOOKS = gql`
  query allBooks($author:String,$genre:String) {
    allBooks(
      author:$author,
      genre:$genre
    ) {
      title
      author {
        name
        born
        id
      }
      published
      id
      genres
    }
  }
`

/*export const ADD_BOOK = gql`
  mutation brandNewBook($title:String!,$published:Int!,$author:String!,$genres:[String!]!) {
    addBook(
      title:$title,
      published:$published,
      author:$author,
      genres:$genres
    ) {
      title
      published
      author
      genres
    }
  }
`*/

export const ADD_BOOK = gql`
  mutation brandNewBook($title:String!,$published:Int!,$author:String!,$genres:[String!]!) {
    addBook(
      title:$title
      published:$published,
      author:$author,
      genres:$genres
    ) {
      title
      published
      genres
      author {
        name
        born
      }
    }
  }
`

export const UPDATE_AUTHOR = gql`
  mutation editAuthor($name:String!,$born:Int!) {
    editAuthor(
      name:$name,
      setBornTo:$born
    ) {
      name
      born
      bookCount
    }
  }
`
export const CREATE_USER = gql`
  mutation createUser($username:String!,$favoriteGenre:String!) {
    createUser(
      username:$username,
      favoriteGenre:$favoriteGenre
    ) {
      username
      favoriteGenre
    }
  }
`
export const LOGIN = gql`
  mutation login($username:String!,$password:String!) {
    login(
      username:$username,
      password:$password
    ) {
      value
    }
  }
`
