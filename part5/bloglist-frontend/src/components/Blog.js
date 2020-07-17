import React, { useState } from 'react';

const Blog = ({ blog, likeButton, deleteBlog, userName }) => {
  const [open, setOpen] = useState(false);
  const [likes, setLikes] = useState(blog.likes)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'dotted',
    borderWidth: 1,
    borderColor: 'grey',
    marginBottom: 5,
  };

  const addLike = () => {
    likeButton(blog.id, {
      title: blog.title,
      author: blog.author,
      likes: blog.likes + 1,
      url: blog.url,
      user: blog.user.id
    })

    setLikes(likes + 1)
  }

  const removeBlog = () => {
    if (window.confirm(`Are you sure you want to delete ${blog.title} by ${blog.author} ?`)) {
      deleteBlog(blog.id)
    }

  }

  const removeButton = () => {
    if (userName === blog.user.username) {
      return  <button onClick={removeBlog} style={{ background: 'red' }}>remove</button>
    }

    return null
  }

  if (!open) {
    return (
      <div style={blogStyle} className='blog-list'>
        {blog.title} {blog.author}{' '}
        <button onClick={() => setOpen(!open)}>view</button>
      </div>
    );
  }

  return (
    <div style={blogStyle}>
      <h4>{blog.title} <button onClick={() => setOpen(!open)}>hide</button></h4>
      <a href={blog.url}>{blog.url}</a>
      <p>
        {likes} <button onClick={addLike}>like</button>
      </p>
      <p>{blog.author}</p>
      {removeButton()}
    </div>
  );
};

export default Blog;
