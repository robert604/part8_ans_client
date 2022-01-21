import React, { useEffect,useState } from 'react'
import { useQuery,useLazyQuery } from '@apollo/client'
import { ALL_BOOKS,ME } from '../queries'


const Recommend = (props) => {
  const [logged,setLogged] = useState(false)
  const [me,meResult] = useLazyQuery(ME)

  useEffect(() => {
    setTimeout(() => {
      setLogged(true)
    },500)
  },[props.token])

  if(logged) {
    me()
    setLogged(false)
  }

  const skip = !meResult.data || !meResult.data.me
  const genreToDisplay = skip ? 'all' : meResult.data.me.favoriteGenre

  const booksResult = useQuery(ALL_BOOKS,
    skip ? {variables:{}} : {variables: {genre:genreToDisplay}}
  )

  if (!props.show) {
    return null
  }


  if(booksResult.loading) {
    return <div>loading...</div>
  }

  const books = booksResult.data.allBooks

  const filteredBooks = genreToDisplay==='all' ? books : books.filter(book => book.genres.includes(genreToDisplay))


  return (
    <div>
      <h2>recommendations</h2>
      <div style={{marginBottom:'20px'}}>
        books in your favorite genre <b>{genreToDisplay}</b>
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
    </div>
  )
}

export default Recommend