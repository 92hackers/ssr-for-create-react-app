/**
 * Controller
 */

import path from 'path'

import express from 'express'

import serverRenderer from '../middlewares/renderer'
import configureStore from '../../src/store/configureStore'
import { setMessage } from '../../src/store/appReducer'

const router = express.Router()

const actionIndex = (req, res, next) => {
  const store = configureStore()
  store.dispatch(setMessage('hi, i am from server, hhhhh...'))

  serverRenderer(store)(req, res, next)
}

router.use('^/*$', actionIndex)

router.use(express.static(
  path.resolve(__dirname, '..', '..', 'build'),
  { maxAge: '30d' },
))

export default router
