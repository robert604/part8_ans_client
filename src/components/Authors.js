  
import React, { useState } from 'react'
import { useQuery,useMutation } from '@apollo/client'
import { ALL_AUTHORS,UPDATE_AUTHOR } from '../queries'

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)
  const [name,setName] = useState('')
  const [born,setBorn] = useState('')

  const [updateAuthor] = useMutation(UPDATE_AUTHOR,{
    refetchQueries: [ALL_AUTHORS]
  })

  const updateClick = (event) => {
    event.preventDefault()
    updateAuthor({ variables: { name,born:Number(born) } })
  }

  const selectedChange = event => {
    console.log('selectedchange',event.target.value)
    setName(event.target.value)
  }

  if (!props.show) {
    return null
  }

  if(result.loading) {
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <form onSubmit={updateClick}>
        <h3>Set birthyear</h3>
        <select value={name} onChange={selectedChange}>
          {authors.map((author) => <option value={author.name} key={author.id}>{author.name}</option>)}
        </select>
        <div>born <input value={born} onChange={({target}) => setBorn(target.value)} /></div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default Authors
