import React, {useState, useEffect} from 'react'

import {useQuery} from '@apollo/client'
import {ALL_BOOKS} from '../queries'

const Recommended = (props) => {
  const [genre, setGenre] = useState(null)
  const result = useQuery(ALL_BOOKS)

  useEffect(() => {
    if (props.user) {
      setGenre(props.user.me.favoriteGenres)
    }
  }, [props.user])

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>Loading...</div>
  }

  const bookFiltered = result.data.allBooks.filter(book => book.genres.includes(genre))
  const booksView = () =>
    !genre ? result.data.allBooks : bookFiltered

  return (
    <div>
      <h2>books</h2>
      {!genre ? '' : <p>books in your favorite genre <strong>{genre}</strong></p>}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {booksView().map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
export default Recommended
