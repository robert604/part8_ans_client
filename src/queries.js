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
  query {
    allBooks {
      title
      author
      published
      id
    }
  }
`

export const ADD_BOOK = gql`
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
