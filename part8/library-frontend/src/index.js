import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import {ApolloClient, ApolloProvider, HttpLink, InMemoryCache, split} from '@apollo/client'
import {setContext} from '@apollo/client/link/context'

import {getMainDefinition} from '@apollo/client/utilities'
import {WebSocketLink} from '@apollo/link-ws'


const authLink = setContext((_, {headers}) => {
  //get the authentication token from local storage if exists
  const token = localStorage.getItem('library-token')
  // return the headers to the context so httpLink can read from them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null
    }
  }
})

const httpLink = new HttpLink({
  uri: 'http://localhost:4000',
})

const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/graphql`,
  options: {
    reconnect: true,
    // connectionParams: {
    //     authToken: localStorage.getItem('library-token')}
  }
})

const splitLink = split(
  ({query}) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  authLink.concat(httpLink)
)

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink,
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)
