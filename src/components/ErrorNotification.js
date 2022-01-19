import React from 'react'

const ErrorNotification = ({message}) => {
  if(message) {
    const style = {
      color:"red"
    }
    return(
      <div style={style}>
        {message}
      </div>
    )
  }
  return null
}

export default ErrorNotification