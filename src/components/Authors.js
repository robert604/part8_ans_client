  
import React, {  useState } from 'react'
import { useQuery,useMutation } from '@apollo/client'
import { ALL_AUTHORS,UPDATE_AUTHOR } from '../queries'

const Authors = ({show,notifyError}) => {
  const result = useQuery(ALL_AUTHORS)
  
  const [name,setName] = useState(null)
  const [born,setBorn] = useState('')

  const [updateAuthor] = useMutation(UPDATE_AUTHOR,{
    refetchQueries: [ALL_AUTHORS],
    onError: (error) => {
      notifyError(error.graphQLErrors[0].message)
    }
  })

  //const [createUser] = useMutation(CREATE_USER)
  //const [login] = useMutation(LOGIN)

  const updateClick = (event) => {
    event.preventDefault()
    updateAuthor({ variables: { name,born:Number(born) } })
    setBorn('')
  }

  const selectedChange = async (event) => {
    setName(event.target.value)

    //const user = await createUser({ variables: {username:'user1',favoriteGenre:'genre1'}})
    //console.log('create user',user)
    //const token = await login({ variables: {username:'user1',password:'secret'}})
    //console.log('login',token)
  }

  if (!show) {
    return null
  }

  if(result.loading) {
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors
  //console.log('authors',authors)
  if(!name && authors.length>0) {
    setName(authors[0].name)
  }

  const selectInitialName = name ? name : ''

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
        <select id='selection' value={selectInitialName} onChange={selectedChange}>
          {authors.map((author) => <option value={author.name} key={author.id}>{author.name}</option>)}
        </select>
        <div>born <input value={born} onChange={({target}) => setBorn(target.value)} /></div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default Authors
