import React, {useEffect} from 'react'

import Cookies from 'js-cookie'
import {useHistory} from 'react-router-dom'

import api from './request'

export default function Logout(props) {
  const history = useHistory()

  useEffect(() => {
    api.defaults.headers['Authorization'] = ''
    Cookies.remove('token')

    history.push('/auth')
  }, [])

  return (
    <div />
  )
}
