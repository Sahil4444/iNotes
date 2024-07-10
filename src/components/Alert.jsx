import React from 'react'

function Alert() {
  return (
    <div className="alert alert-danger alert-dismissible fade show m-0" role="alert" style={{width: "25%"}}>
        <strong>Note has been deleted!</strong>.
        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  )
}

export default Alert
