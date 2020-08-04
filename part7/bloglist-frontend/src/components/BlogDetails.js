import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'

import { commentBlog } from '../reducers/blogReducer'

const BlogDetails = ({ blogDetails, handleLike, handleRemove, user }) => {
  const dispatch = useDispatch()
  const [commentText, setCommentText] = useState('')

  const handleNewComment = (event) => {
    event.preventDefault()
    dispatch(commentBlog(blogDetails, commentText))
    setCommentText('')
  }

  if (!blogDetails) {
    return null
  }
  const { author, id, likes, title, url, comments } = blogDetails
  const own = user.username === blogDetails.user.username

  console.log(comments)
  return (
    <div>
      <h1>
        {title} by {author}
      </h1>
      <div>
        <div>
          <a href={url} target="_blank" rel="noopener noreferrer">
            {url}
          </a>
        </div>
        <div>
          likes {likes}
          <button onClick={() => handleLike(blogDetails)}>like</button>
        </div>
        <div>{user.name}</div>
        {own && <button onClick={() => handleRemove(id)}>remove</button>}
      </div>
      <h3>Comments</h3>
      <form onSubmit={handleNewComment}>
        <input
          value={commentText}
          onChange={({ target }) => setCommentText(target.value)}
        />
        <button type="submit">add comment</button>
      </form>
      <ul>
        {comments.map((comment) => (
          <li key={comment._id}>{comment.body}</li>
        ))}
      </ul>
    </div>
  )
}

BlogDetails.propTypes = {
  blogDetails: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  }),
  handleLike: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired
}
export default BlogDetails
