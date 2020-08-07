import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import {
  Text,
  Icon,
  Link,
  Flex,
  Input,
  List,
  ListItem,
  ListIcon,
  Button,
  Box,
  Heading
} from '@chakra-ui/core'

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

  return (
    <Box m={5} p={5}>
      <Heading mb={5}>
        {title} by {author}
      </Heading>
      <Box>
        <Box pb={5} mb={5}>
          <Link href={url} isExternal>
            <Text fontSize="2xl">
              {' '}
              {url} <Icon name="external-link" mx="2px" />{' '}
            </Text>
          </Link>
        </Box>
        <Flex pb={5} mb={5}>
          <Text fontSize="xl" as="mark">
            {likes} likes{' '}
          </Text>
          <Button
            variantColor="blue"
            size="sm"
            onClick={() => handleLike(blogDetails)}
            ml={5}
          >
            like
          </Button>
        </Flex>
        <Box>
          <Text>added by {own ? 'you' : blogDetails.user.name}</Text>
        </Box>
        {own && (
          <Button
            ml="auto"
            size="xs"
            variantColor="red"
            onClick={() => handleRemove(id)}
          >
            remove
          </Button>
        )}
      </Box>
      <Box p={5} mt={3} shadow="sm">
        <Heading pt={1} pb={4} as="h3" size="lg">
          Comments
        </Heading>
        <form onSubmit={handleNewComment}>
          <Flex>
            <Input
              value={commentText}
              onChange={({ target }) => setCommentText(target.value)}
              mr={1}
            />
            <Button type="submit">add comment</Button>
          </Flex>
        </form>
        <List mt={4} spacing={3}>
          {comments.map((comment) => (
            <ListItem key={comment._id}>
              <ListIcon icon="chat" />
              {comment.body}
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
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
