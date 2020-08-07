import React, { useState } from 'react'
import { FormLabel, Input, Button, Box, Heading } from '@chakra-ui/core'

const NewBlog = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleNewBlog = (event) => {
    event.preventDefault()

    props.createBlog({
      title,
      author,
      url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <Box mb={5}>
      <Heading as="h3" pb={10}>
        Create new:
      </Heading>
      <form onSubmit={handleNewBlog}>
        <FormLabel htmlFor="author">Author</FormLabel>
        <Input
          id="author"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
          variant="flushed"
          size="sm"
          mb={2}
        />
        <FormLabel htmlFor="title">Title</FormLabel>
        <Input
          id="title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          variant="flushed"
          size="sm"
          mb={2}
        />
        <FormLabel>url</FormLabel>
        <Input
          id="url"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
          variant="flushed"
          size="sm"
          mb={2}
        />
        <Button rightIcon="check" variantColor="teal" id="create">
          create
        </Button>
      </form>
    </Box>
  )
}

export default NewBlog
