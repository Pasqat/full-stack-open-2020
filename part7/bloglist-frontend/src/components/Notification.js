import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notifications)
  if (!notification) {
    return null
  }

  const style = {
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    color: notification.notificationType === 'success' ? 'green' : 'red',
    background: 'lightgrey'
  }

  return <div style={style}>{notification.message}</div>
}

export default Notification
