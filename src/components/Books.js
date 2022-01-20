import React, {useState} from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'


const Books = (props) => {
  const [genreToDisplay,setGenreToDisplay] = useState('all')
  const result = useQuery(ALL_BOOKS,{
    variables: {}
  })

  if (!props.show) {
    return null
  }
  if(result.loading) {
    return <div>loading...</div>
  }

  const books = result.data.allBooks
  const genresUnion = books.reduce((unionOfGenres,book) => {
    for(const g of book.genres) unionOfGenres.add(g)
    return unionOfGenres
  },new Set())
  const allGenres = Array.from(genresUnion).concat('all')
  const filteredBooks = genreToDisplay==='all' ? books : books.filter(book => book.genres.includes(genreToDisplay))


  return (
    <div>
      <h2>books</h2>
      <div style={{marginBottom:'20px'}}>
        in genre <b>{genreToDisplay}</b>
      </div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {filteredBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      {allGenres.map(gen => {
        const changeDisplayGenre = () => {
          setGenreToDisplay(gen)
        }
        return(
          <button key={gen} onClick={changeDisplayGenre}>{gen}</button>
        )
      })}
    </div>
  )
}

export default Books