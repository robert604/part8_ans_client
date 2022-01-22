
import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Display from './components/Display'
import Recommend from './components/Recommend'
import ErrorNotification from './components/ErrorNotification'
import { useApolloClient,useSubscription } from '@apollo/client'
import { BOOK_ADDED } from './queries'


const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(localStorage.getItem('books-user-token'))
  const [errorMessage,setErrorMessage] = useState(null)
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onSubscriptionData:({ subscriptionData }) => {
      const { bookAdded} = subscriptionData.data
      window.alert(`Added book title:"${bookAdded.title}" author:"${bookAdded.author.name}"`)
    }
  })

  const notifyError = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    },5000)
  }

  const logoutClick = event => {
    setToken(null)
    client.resetStore()
    localStorage.clear()
  }

  const loginClick = event => {
    setPage('login')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <Display display={token}>
          <button onClick={() => setPage('add')}>add book</button>
          <button onClick={() => setPage('recommend')}>recommend</button>
        </Display>
        <Display display={token}>
          <button onClick={logoutClick}>Logout</button>
        </Display>
        <Display display={!token}>
          <button onClick={loginClick}>Login</button>
        </Display>
        <ErrorNotification message={errorMessage} />
      </div>

      <Authors show={page === 'authors'} notifyError={notifyError} />
      <Recommend show={page==='recommend'} token={token}/>
      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'} token={token} notifyError={notifyError}
      />

      <Login show={page === 'login'} setToken={setToken} setPage={setPage}/>
    </div>
  )
}

export default App