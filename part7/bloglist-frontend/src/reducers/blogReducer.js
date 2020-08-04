import blogService from '../services/blogs'
import { setNotification } from './notificationReducers'

const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_BLOG':
    return action.data
  case 'ADD_BLOG':
    return [...state, action.data]
  case 'LIKE_BLOG': {
    const id = action.data.id
    return state.map((blog) => (blog.id !== id ? blog : action.data))
  }
  case 'COMMENT_BLOG': {
    const id = action.data.id
    return state.map((blog) => (blog.id !== id ? blog : action.data))
  }
  case 'DELETE_BLOG': {
    const id = action.data.id
    console.log(action.data)
    return state.filter((blog) => blog.id !== id)
  }
  default:
    return state
  }
}

export const initializeBlog = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOG',
      data: blogs
    })
  }
}

export const addBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog)
    dispatch({
      type: 'ADD_BLOG',
      data: newBlog
    })
    dispatch(
      setNotification(
        `A new blog '${newBlog.title}' by ${newBlog.author} added!`,
        'success',
        5000
      )
    )
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const likedBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    await blogService.update(likedBlog)
    dispatch({
      type: 'LIKE_BLOG',
      data: likedBlog
    })
  }
}

export const commentBlog = (blog, comment) => {
  const commentToAdd = {
    body: comment,
    date: new Date()
  }
  return async (dispatch) => {
    const commentedBlog = {
      ...blog,
      comments: [...blog.comments, commentToAdd]
    }
    const response = await blogService.update(commentedBlog)
    dispatch({
      type: 'COMMENT_BLOG',
      data: response
    })
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id)
    dispatch({
      type: 'DELETE_BLOG',
      data: { id }
    })
  }
}

export default blogReducer
