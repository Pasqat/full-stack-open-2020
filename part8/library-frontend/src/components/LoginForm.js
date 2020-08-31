import React, {useState, useEffect} from 'react'

import {useMutation} from '@apollo/client'
import {LOGIN} from '../queries'

const LoginForm = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [login, result] = useMutation(LOGIN)

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      props.setToken(token)
      localStorage.setItem('library-token', token)
    }
  }, [result.data]) //eslint-disable-line

  const submit = (event) => {
    event.preventDefault()

    login({variables: {username, password}})
    console.log('😀 logged')

    setUsername('')
    setPassword('')
    props.setPage('books')
  }

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h3>Login</h3>
      <form onSubmit={submit}>
        <div>
          <label>username:</label>
          <input type="text"
            value={username}
            onChange={({target}) => setUsername(target.value)} />
        </div>
        <div>
          <label>password:</label>
          <input type="password"
            value={password}
            onChange={({target}) => setPassword(target.value)} />
        </div>
        <button type="submit">GO!</button>
      </form>
    </div>
  )
}

export default LoginForm
