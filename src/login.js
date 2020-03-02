import React, {useEffect, useState} from 'react'

import Cookies from 'js-cookie'
import { useHistory } from 'react-router-dom'
import _ from 'lodash'

import api from './request'

import './login.css'

export default function Login(props) {
  const history = useHistory()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [error, setError] = useState(false)

  useEffect(() => {
    const cookieToken = Cookies.get('token')

    if (!_.isEmpty(_.trim(cookieToken))) {
      history.push('/')
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setError(false)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, password])

  function signIn(e) {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }

    api.post('/auth', {email, password})
      .then(response => {
        api.defaults.headers['Authorization'] = response.data.token
        Cookies.set('token', response.data.token)
        history.push('/')
      })
      .catch(() => {
        setError(true)
      })
  }

  return (
    <div className='contain text-center'>
      <form className="form-signin" onSubmit={signIn}>
        <img className="mb-4"
             src="https://s3-ap-southeast-1.amazonaws.com/resources.wobbjobs.com/uploads/company-logo/company_logo_image/31cc4f85-79af-4866-b7ee-94f20171bf93/setel-ventures-sdn-bhd-1572921188.png"
             alt=""/>
        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
        <label htmlFor="inputEmail" className="sr-only">Email address</label>
        <input
          type="email"
          id="inputEmail"
          className={`form-control ${error ? 'is-invalid' : ''}`}
          placeholder="Email address"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          autoFocus/>
        <label htmlFor="inputPassword" className="sr-only">Password</label>
        <input
          type="password"
          id="inputPassword"
          className={`form-control ${error ? 'is-invalid' : ''}`}
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required/>
        <div className="invalid-feedback">
          Email or password is invalid
        </div>
        <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={signIn}>Sign in</button>
        <p className="mt-5 mb-3 text-muted">&copy; 2020</p>
      </form>
    </div>
  )
}
