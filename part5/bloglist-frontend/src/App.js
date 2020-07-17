import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlogForm from './components/NewBlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [notification, setNotification] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }

    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  const notifyWith = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))

      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      notifyWith(' wrong username or password', 'error')
      console.log(exception)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistUser')
    setUser(null)
  }

  const loginForm = () => {
    return (
      <div>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  const addLike = async (id, blogObject) => {
    await blogService.update(id, blogObject)

    notifyWith('You liked it!')
  }

  const addBlog = async (blogObject) => {
    try {
      const returnedObject = await blogService.create(blogObject)

      notifyWith(
        `a new blog ${returnedObject.title} by ${returnedObject.author} added`
      )
      setBlogs(blogs.concat(returnedObject))
    } catch (exception) {
      console.log(exception.response.data.error)
      notifyWith(`${exception.response.data.error} `, 'error')
    }
  }

  const removeBlog = async (id) => {
    try {
      blogService.remove(id)
      notifyWith('the blog was deleted')
      setBlogs(blogs.filter((blog) => blog.id !== id))
    } catch (exception) {
      console.log(exception.response.data.error)
      notifyWith(`${exception.response.data.error} `, 'error')
    }
  }

  if (user === null) {
    return (
      <div>
        <Notification notification={notification} />
        <h2>Login to application</h2>
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>

      <p>
        {user.name} logged in <button onClick={handleLogout}>log out</button>{' '}
      </p>
      <h3>Create new</h3>
      <Notification notification={notification} />
      <Togglable buttonLabel="new blog">
        <NewBlogForm createBlog={addBlog} />
      </Togglable>
      {blogs
        .map((blog) => {
          return (
            <Blog
              key={blog.id}
              blog={blog}
              likeButton={addLike}
              deleteBlog={removeBlog}
              userName={user.username}
            />
          )
        })
        .sort((a, b) => {
          return b.props.blog.likes - a.props.blog.likes
        })}
    </div>
  )
}

export default App
