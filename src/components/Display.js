import React from 'react'

const Display = ({ display,children }) => {
  if(display) return (
    <div  style={{display:'inline'}}>
      {children}
    </div>
  )
  return null
}

export default Display