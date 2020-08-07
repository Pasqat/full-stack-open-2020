import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import {
  Heading,
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Stack
} from '@chakra-ui/core'

import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'
import UserDetails from './components/UserDetails'
import Users from './components/Users'
import BlogDetails from './components/BlogDetails'
import Header from './components/Header'

import storage from './utils/storage'
import {
  initializeBlog,
  addBlog,
  likeBlog,
  deleteBlog
} from './reducers/blogReducer'
import { initializeUsers } from './reducers/usersReducers'
import { setNotification } from './reducers/notificationReducers'
import { userLogin, setUser } from './reducers/loginReducers'

const App = () => {
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const users = useSelector((state) => state.users)
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogFormRef = React.createRef()

  useEffect(() => {
    dispatch(initializeBlog())
    dispatch(initializeUsers())
  }, [dispatch])

  useEffect(() => {
    const storedUser = storage.loadUser()
    dispatch(setUser(storedUser))
  }, [dispatch])

  const userMatch = useRouteMatch('/users/:id')
  const userDetails = userMatch
    ? users.find((user) => user.id === userMatch.params.id)
    : null

  const blogMatch = useRouteMatch('/blogs/:id')
  const blogDetails = blogMatch
    ? blogs.find((blog) => blog.id === blogMatch.params.id)
    : null

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      dispatch(userLogin(username, password))
      setUsername('')
      setPassword('')
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
    const blogToRemove = blogs.find((b) => b.id === id)
    const ok = window.confirm(
      `Remove blog ${blogToRemove.title} by ${blogToRemove.author}`
    )
    if (ok) {
      dispatch(deleteBlog(id))
    }
  }

  const handleLogout = () => {
    dispatch(setUser(null))
    storage.logoutUser()
  }
  if (!user) {
    return (
      <Box
        p={4}
        maxW="sm"
        alignSelf="center"
        borderWidth="1px"
        rounded="lg"
        m={10}
      >
        <Heading>login to application</Heading>
        <Notification />
        <form onSubmit={handleLogin}>
          <FormControl isInvalid={Notification}>
            <FormLabel htmlFor="name">username</FormLabel>
            <Input
              id="username"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
              placeholder="username"
              focusBorderColor="lime"
            />
            <FormLabel htmlFor="password">password</FormLabel>
            <Input
              id="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              placeholder="password"
              type="password"
            />
            <Button id="login" mt={4} variantColor="teal" type="submit">
              login
            </Button>
          </FormControl>
        </form>
      </Box>
    )
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes
  return (
    <Box>
      <Header user={user} handleLogout={handleLogout} />
      <Notification />
      <Switch>
        <Route path="/users/:id">
          <UserDetails userDetails={userDetails} />
        </Route>
        <Route path="/users">
          <Users users={users} />
        </Route>
        <Route path="/blogs/:id">
          <BlogDetails
            blogDetails={blogDetails}
            handleLike={handleLike}
            handleRemove={handleRemove}
            user={user}
          />
        </Route>
        <Route path="/">
          <Togglable buttonLabel="Add new Blog" ref={blogFormRef}>
            <NewBlog createBlog={createBlog} />
          </Togglable>
          <Stack m={2} spacing={8}>
            {blogs.sort(byLikes).map((blog) => (
              <Blog key={blog.id} blog={blog} />
            ))}
          </Stack>
        </Route>
      </Switch>
    </Box>
  )
}

export default App
