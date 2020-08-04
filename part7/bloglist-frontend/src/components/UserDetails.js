import React from 'react'

const UserDetails = ({ userDetails }) => {
  console.log(userDetails)
  if (!userDetails) {
    return null
  }
  return (
    <div>
      <h1>{userDetails.name}</h1>
      <h2>added blogs</h2>
      <ul>
        {userDetails.blogs.map((blog) => (
          <li key={blog.id}>
            {blog.title}, <strong>{blog.likes} likes</strong>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UserDetails
