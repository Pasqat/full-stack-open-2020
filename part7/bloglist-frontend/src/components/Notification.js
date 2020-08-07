import React from 'react'
import { useSelector } from 'react-redux'
import { Alert, AlertIcon } from '@chakra-ui/core'

const Notification = () => {
  const notification = useSelector((state) => state.notifications)
  if (!notification) {
    return null
  }

  return (
    <Alert status={notification.notificationType}>
      <AlertIcon />
      {notification.message}
    </Alert>
  )
}

export default Notification
