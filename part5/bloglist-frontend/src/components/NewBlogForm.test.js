import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import NewBlogForm from './NewBlogForm'

test('When a new blog is called it receive the right props', () => {
  const createBlog = jest.fn()

  const component = render(
    <NewBlogForm createBlog={createBlog} />
  )


  const author = component.container.querySelector('#author')
  const title = component.container.querySelector('#title')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(author, {
    target: { value: 'myself' }
  })
  fireEvent.change(title, {
    target: {
      value: 'testing of froms'
    }
  })
  fireEvent.change(url, {
    target: { value: 'http://localhost' }
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  console.log(createBlog.mock.calls)
  expect(createBlog.mock.calls[0][0].author).toBe('myself')
  expect(createBlog.mock.calls[0][0].title).toBe('testing of froms')
  expect(createBlog.mock.calls[0][0].url).toBe('http://localhost')

})