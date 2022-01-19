import { useMutation } from '@apollo/client'
import React, {useEffect, useState} from 'react'
import {LOGIN} from '../queries'

const Login = ({show,setToken}) => {
  const [login,loginResult] = useMutation(LOGIN)
  //console.log('loginresult',loginResult)

  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')

  useEffect(() => {
    if(loginResult.data) {
      const token = loginResult.data.login.value
      setToken(token)
      localStorage.setItem('books-user-token',token)
      console.log('logged in',loginResult.data)
    }
  },[loginResult.data]) //eslint-disable-line

  const usernameChange = (event) => {
    setUsername(event.target.value)
  }
  const passwordChange = event => {
    setPassword(event.target.value)
  }

  const loginClick = async (event) => {
    event.preventDefault()
    await login({variables:{username,password}})
    setUsername('')
    setPassword('')
  }

  if(show) {
    return(
      <div>
        <form onSubmit={loginClick}>
          <div>
            username <input value={username} onChange={usernameChange} />
          </div>
          <div>
            password <input value={password} onChange={passwordChange} />
          </div>
          <div>
            <button>Login</button>
          </div>
        </form>
      </div>
    )
  }
  return null
}

export default Login