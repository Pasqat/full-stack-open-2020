import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import blogReducer from './reducers/blogReducer'
import notificationReducers from './reducers/notificationReducers'
import loginReducers from './reducers/loginReducers'
import usersReducers from './reducers/usersReducers'

const reducer = combineReducers({
  blogs: blogReducer,
  notifications: notificationReducers,
  user: loginReducers,
  users: usersReducers
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store
