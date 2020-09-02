import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import {ApolloClient, ApolloProvider, HttpLink, InMemoryCache} from '@apollo/client'
import {setContext} from '@apollo/client/link/context'

const httpLink = new HttpLink({
  uri: 'http://localhost:4000',
})

const authLink = setContext((_, {headers}) => {
  //get the authentication token from local storage if exists
  const token = localStorage.getItem('library-token')
  // return the headers to the context so httpLink can read from them
  return {
    headers: {
      ...headers,
      AUthorization: token ? `Bearer ${token}` : ''
    }
  }
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
  headers: {
    authorization: localStorage.getItem('library-token')
  }

})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)
