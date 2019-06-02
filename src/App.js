import React from 'react'
import Loadable from 'react-loadable'
import { connect } from 'react-redux'

import { setMessage, setMessageAsync } from './store/appReducer'

import './App.css';

const Main = Loadable({
  loader: () => import(/* webpackChunkName: "mainChunk" */ './Main'),
  loading: () => <div>Loading...</div>,
  modules: ['mainChunk']
})

class App extends React.Component {
  componentDidMount() {
    console.log('app is mounted')

    const {
      message, setMessage,
      data, setMessageAsync,
    } = this.props

    if(!message) {
      setMessage("Hi, I'm from client!");
    }

    if (!data) {
      setMessageAsync()
    }
  }

  render() {
    const { data, message } = this.props

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
        <h1>{`just message: ${message}`}</h1>
        <hr />
        <h1>{`豆瓣 pip data: ${data}`}</h1>
        <Main />
      </div>
    )
  }
}

const mapDispatchToProps = ({
  setMessage,
  setMessageAsync,
})

const mapStateToProps = ({ app }) => ({
  message: app.message,
  data: app.data,
})

export default connect(mapStateToProps, mapDispatchToProps)(App)

