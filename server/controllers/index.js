/**
 * Controller
 */

import serverRenderer from '../middlewares/renderer'
import configureStore from '../../src/store/configureStore'
import { setMessage } from '../../src/store/appReducer'

const actionIndex = (req, res, next) => {
  const store = configureStore()
  store.dispatch(setMessage('hi, i am from server, hhhhh...'))

  serverRenderer(store)(req, res, next)
}

export default actionIndex
