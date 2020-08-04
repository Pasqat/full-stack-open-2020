import React from 'react'
import { Link } from 'react-router-dom'

const Users = ({ users }) => {
  console.log(users)
  return (
    <div>
      <h1>Users</h1>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            )
          })}
          <tr>
            <td>Nome e Cognome</td>
            <td>5</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Users
