/**
 * Server entry
 */

import express from 'express'
import Loadable from 'react-loadable'

import serverRenderer from './middlewares/renderer'

// init
const PORT = 4000
const path = require('path')

const app = express()
const router = express.Router()

const assetsRootDir = path.resolve(__dirname, '../build')

// 路由规则定义
router.use('^/$', serverRenderer(assetsRootDir))

// 解析静态文件
router.use(express.static(assetsRootDir, { maxAge: '30d' }))

// 路由挂载
app.use(router)

// 监听端口
const handleListen = (error) => {
  if (error) {
    throw new Error(`Something bad: ${error}`)
  }

  console.log(`SSR server Listening on port: ${PORT} ...`)
}

Loadable.preloadAll().then(() => app.listen(PORT, handleListen))
