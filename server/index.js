/**
 * Server entry
 */

import express from 'express'
import Loadable from 'react-loadable'

import indexController from './controllers'


// init
const PORT = 4000

// App
const app = express()

// 路由挂载
app.use(indexController)

// 监听端口
const handleListen = (error) => {
  if (error) {
    throw new Error(`Something bad: ${error}`)
  }

  console.log(`SSR server Listening on port: ${PORT} ...`)
}

// 预加载所有的懒加载模块。
// 这样会有什么问题呢？
Loadable.preloadAll().then(() => app.listen(PORT, handleListen))
