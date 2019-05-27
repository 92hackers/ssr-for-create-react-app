import React from 'react';
import Loadable from 'react-loadable'

import './App.css';

const Main = Loadable({
  loader: () => import(/* webpackChunkName: "mainChunk" */ './Main'),
  loading: () => <div>Loading...</div>,
  modules: ['mainChunk']
})


function App() {
  console.log('app is rendering')

  return (
    <div className="App">
      <header className="App-header">
        <img src="/images/logo.svg" className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <Main />
    </div>
  );
}

export default App;
