
import React, {useState, useEffect} from 'react'

import {useQuery, useMutation} from '@apollo/client'
import {ALL_AUTHORS, EDIT_AUTHOR} from '../queries'

import Select from 'react-select'

const SetBirthyear = ({allAuthors}) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [editAuthor, result] = useMutation(EDIT_AUTHOR)

  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      alert('Author not found')
    }
  }, [result.data]) // eslint-disable-line

  const submit = (event) => {
    event.preventDefault()

    editAuthor({variables: {name, setBornTo: Number(born)}})
    setName('')
    setBorn('')
  }

  const options = allAuthors.map(a =>
    ({value: a.name, label: a.name})
  )

  return (
    <div>
      <h3>Set Birthyear</h3>
      <form onSubmit={submit}>

        <Select
          options={options}
          onChange={(selectedOption) => setName(selectedOption.value)}
        />

        <div>
          born: <input type="text"
            value={born}
            onChange={({target}) => setBorn(target.value)} />
        </div>
        <button type="submit">update author</button>
      </form>

    </div>
  )
}

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div> Loading... </div>
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {result.data.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <SetBirthyear allAuthors={result.data.allAuthors} />
    </div>
  )
}

export default Authors
