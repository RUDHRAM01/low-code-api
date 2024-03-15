import React from 'react'
import { Link } from 'react-router-dom'

function BreadCrumb(props) {
  return (
    <div className='breadCrumb'>
       <span><Link to={`/${props.root}`} style={{textDecoration:"none",color:"#3498db"}}>{props?.root}</Link></span>/{props?.path}
    </div>
  )
}

export default BreadCrumb