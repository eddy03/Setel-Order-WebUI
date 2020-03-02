import React, {Fragment, useEffect, useState} from 'react'

import Cookie from 'js-cookie'
import _ from 'lodash'
import {useHistory} from 'react-router-dom'
import moment from 'moment'
import $ from 'jquery'

import './homepage.css'

import api from './request'


export default function Homepage(props) {
  const history = useHistory()

  const [orders, setOrders] = useState([])
  const [description, setDescription] = useState('')

  useEffect(() => {
    if (_.isEmpty(api.defaults.headers['Authorization'])) {
      const cookieToken = Cookie.get('token')

      if (!_.isEmpty(_.trim(cookieToken))) {
        api.defaults.headers['Authorization'] = cookieToken
        getOrders()
      } else {
        history.push('/auth')
      }
    } else {
      getOrders()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function getOrders() {
    api.get('/orders')
      .then(response => setOrders(_.orderBy(response.data, ['createdAt'], ['asc'])))
      .catch(err => console.error(err.toString()))
  }

  function newOrder(e) {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }

    api.post('/orders', {description})
      .then(getOrders)
      .then(() => setDescription(''))
      .catch(err => console.error(err.toString()))
  }

  return (
    <Fragment>
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <h1 className="display-4">Orders collections</h1>
          </div>
          <div className="col col-lg-2 d-flex justify-content-center align-items-center">
            <button
              type="button"
              className="btn btn-primary btn-lg"
              data-toggle="modal" data-target="#addOrderModal">
              New Order
            </button>
          </div>
        </div>
        <hr/>
      </div>

      <div className={'homepage'}>
        <table className="table">
          <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Description</th>
            <th scope="col">Status</th>
            <th scope="col">Order date</th>
          </tr>
          </thead>
          <tbody>
          {
            orders.map(order => {
              return (
                <tr key={order.id}>
                  <th width={'30px'} scope="row">{order.id}</th>
                  <td>{order.description}</td>
                  <td width={'150px'}>{order.status}</td>
                  <td width={'200px'}>{moment(order.createdAt).format('DD/MM/YYYY HH:mm a')}</td>
                </tr>
              )
            })
          }
          </tbody>
        </table>
      </div>

      <div className="modal fade" id="addOrderModal" tabIndex="-1" role="dialog"
           aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalCenterTitle">New Order</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={newOrder}>
                <label htmlFor="inputDescription" className="sr-only">Description</label>
                <textarea
                  id="inputDescription"
                  rows="3"
                  className={'form-control'}
                  placeholder={'Description'}
                  onChange={e => setDescription(e.target.value)}
                  value={description}>
                </textarea>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={newOrder}>Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}
