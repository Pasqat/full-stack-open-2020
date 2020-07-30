import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'

import storage from './utils/storage'
import {
  initializeBlog,
  addBlog,
  likeBlog,
  deleteBlog
} from './reducers/blogReducer'
import { setNotification } from './reducers/notificationReducers'
import { userLogin, setUser } from './reducers/loginReducers'

const App = () => {
  const posts = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogFormRef = React.createRef()

  useEffect(() => {
    dispatch(initializeBlog())
  }, [dispatch])

  useEffect(() => {
    const user = storage.loadUser()
    dispatch(setUser(user))
  }, [dispatch])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      setUsername('')
      setPassword('')

      dispatch(userLogin(username, password))
      dispatch(setNotification(`${user.name} welcome back!`, 'success', 5000))
      storage.saveUser(user)
    } catch (exception) {
      dispatch(setNotification('wrong username or password', 'error', 5000))
    }
  }

  const createBlog = (blog) => {
    try {
      dispatch(addBlog(blog))
    } catch (exception) {
      console.log(exception)
    }
  }

  const handleLike = async (id) => {
    dispatch(likeBlog(id))
  }

  const handleRemove = async (id) => {
    const blogToRemove = posts.find((b) => b.id === id)
    const ok = window.confirm(
      `Remove blog ${blogToRemove.title} by ${blogToRemove.author}`
    )
    if (ok) {
      dispatch(deleteBlog(id))
    }
  }

  const handleLogout = () => {
    dispatch(userLogin(null))
    storage.logoutUser()
  }
  if (!user) {
    return (
      <div>
        <h2>login to application</h2>
        <Notification />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id="username"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id="login">login</button>
        </form>
      </div>
    )
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <div>
      <h2>blogs</h2>

      <Notification />
      {/* <Notification notification={notification} /> */}

      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>

      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <NewBlog createBlog={createBlog} />
      </Togglable>

      {posts.sort(byLikes).map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={handleLike}
          handleRemove={handleRemove}
          own={user.username === blog.user.username}
        />
      ))}
    </div>
  )
}

export default App
