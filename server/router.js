/**
 * Server router config
 */

import path from 'path'
import express from 'express'

import actionIndex from './controllers/index'


const router = express.Router()

router.use(express.static(
  path.resolve(__dirname, '..', '..', 'build'),
  { maxAge: '30d' },
))

router.use('^/*$', actionIndex)

export default router
