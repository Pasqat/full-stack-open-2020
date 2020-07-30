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

export const likeBlog = (id) => {
  return async (dispatch, getState) => {
    const blogToLike = getState().blogs.find((b) => b.id === id)
    const likedBlog = {
      ...blogToLike,
      likes: blogToLike.likes + 1,
      user: { ...blogToLike.user }
    }
    dispatch({
      type: 'LIKE_BLOG',
      data: likedBlog
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
