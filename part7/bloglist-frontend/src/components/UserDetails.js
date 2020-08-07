import React from 'react'
import { Stack, Text, Box, Heading } from '@chakra-ui/core'

const UserDetails = ({ userDetails }) => {
  console.log(userDetails)
  if (!userDetails) {
    return null
  }
  return (
    <Box m={5} p={5}>
      <Heading>{userDetails.name}</Heading>
      <Heading as="h3" size="lg">
        added blogs
      </Heading>
      <Stack spacing={2} mt={5}>
        {userDetails.blogs.map((blog) => (
          <Box p={5} key={blog.id} mt={2} shadow="md" borderWidth="1px">
            {blog.title}, <Text as="mark">{blog.likes} likes</Text>
          </Box>
        ))}
      </Stack>
    </Box>
  )
}

export default UserDetails
