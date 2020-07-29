import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import blogReducer from './reducers/blogReducer'
import notificationReducers from './reducers/notificationReducers'

const reducer = combineReducers({
  blogs: blogReducer,
  notifications: notificationReducers
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store
