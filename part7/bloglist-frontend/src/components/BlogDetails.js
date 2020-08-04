import React from 'react'
import PropTypes from 'prop-types'

const BlogDetails = ({ blogDetails, handleLike, handleRemove, user }) => {
  if (!blogDetails) {
    return null
  }
  const { author, id, likes, title, url } = blogDetails
  console.log(blogDetails)
  const own = user.username === blogDetails.user.username
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
          <button onClick={() => handleLike(id)}>like</button>
        </div>
        <div>{user.name}</div>
        {own && <button onClick={() => handleRemove(id)}>remove</button>}
      </div>
    </div>
  )
}

BlogDetails.propTypes = {
  blogDetails: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  }).isRequired,
  handleLike: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
  own: PropTypes.bool.isRequired
}
export default BlogDetails
