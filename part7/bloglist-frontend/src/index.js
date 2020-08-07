import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import store from './store'
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider, CSSReset } from '@chakra-ui/core'

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <ThemeProvider>
        <CSSReset />
        <App />
      </ThemeProvider>
    </Router>
  </Provider>,
  document.getElementById('root')
)
