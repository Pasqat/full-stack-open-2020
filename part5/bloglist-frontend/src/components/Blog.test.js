import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('render the list but not the details', () => {
  const blog = {
    title: 'This is visible',
    author: 'myself',
    url: 'https://notvisible',
    likes: 10
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} likeButton={mockHandler}/>
  )

  expect(component.container).toHaveTextContent('This is visible')
  expect(component.container).toHaveTextContent('myself')
  expect(component.container).not.toHaveTextContent('https://notvisible')
})

test('clicking the button show the details', () => {
  const blog = {
    title: 'This is visible',
    author: 'myself',
    url: 'https://notvisible',
    likes: 10,
    user: {
      username: 'root'
    }
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} button={mockHandler} />
  )

  const button = component.getByText('view')

  fireEvent.click(button)

  expect(component.container).toHaveTextContent('https://notvisible')
  expect(component.container).toHaveTextContent(10)

})