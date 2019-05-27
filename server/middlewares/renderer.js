/**
 * Server renderer, for rendering react app
 * 
 */

import React from 'react'
import ReactDOMServer from 'react-dom/server'
import Loadable from 'react-loadable'

// import our main App component
import App from '../../src/App';

const path = require("path");
const fs = require("fs");

const renderer = assetsRootDir => (req, res, next) => {
  // point to the html file created by CRA's build tool
  const htmlFilePath = path.resolve(assetsRootDir, './index.html');

  fs.readFile(htmlFilePath, 'utf8', (err, htmlData) => {
    if (err) {
      console.error('err', err);
      return res.status(404).end()
    }

    const modules = []

    // render the app as a string
    const html = ReactDOMServer.renderToString(
      <Loadable.Capture report={m => modules.push(m)}>
        <App/>
      </Loadable.Capture>
    );

    console.log(modules)

    // inject the rendered app into our html and send it
    return res.send(
      htmlData.replace(
        '<div id="root"></div>',
        `<div id="root">${html}</div>`
      )
    );
  });
}

export default renderer
