/**
 * Server renderer, used to render react app
 * 
 */

import path from 'path'
import fs from 'fs'

import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { Provider as ReduxProvider } from 'react-redux'

import Loadable from 'react-loadable'

// import our main App component
import App from '../../src/App';

const renderer = store => (req, res, next) => {
  // point to the html file created by CRA's build tool
  const htmlFilePath = path.resolve(__dirname, '..', '..', './build', './index.html');

  const reduxState = JSON.stringify(store.getState())

  fs.readFile(htmlFilePath, 'utf8', (err, htmlData) => {
    if (err) {
      console.error('err', err);
      return res.status(404).end()
    }

    const modules = []

    // render the app as a string
    const html = ReactDOMServer.renderToString(
      <Loadable.Capture report={m => modules.push(m)}>
        <ReduxProvider store={store}>
          <App/>
        </ReduxProvider>
      </Loadable.Capture>
    );

    // inject the rendered app into our html and send it
    return res.send(
      htmlData.replace(
        '<div id="root"></div>',
        `<div id="root">${html}</div>`
      ).replace(
        '"__SERVER_REDUX_STATE__"',
        reduxState
      )
    )
  })
}

export default renderer
