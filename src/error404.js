import React, {useEffect} from 'react'

import {Link} from 'react-router-dom'

import './error404.css'

export default function Error404(props) {
  return (
    <div className={'error404'}>
      Error 404. Page was not found! <br/>
      <Link to={'/'}>Back to homepage</Link>
    </div>
  )
}
