import React from 'react'
import Loadable from 'react-loadable'
import { connect } from 'react-redux'
import { withRouter, Link, Switch, Route } from "react-router-dom"

import { setMessage, setMessageAsync } from '../../store/appReducer'

import Home from "../Home"
import About from "../About"
import Contact from "../Contact"
import Root from '../Root'

import './App.css'

const Main = Loadable({
  loader: () => import(/* webpackChunkName: "mainChunk" */ '../Main'),
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
    console.log(data)

    console.log(this.props)

    return (
      <div className="App">
        <header className="App-header">
          <img src="/images/logo.svg" className="App-logo" alt="logo" />
          <p>
            Create React App with Server Side Rendering support
          </p>
        </header>
        <h1>{`just message: ${message}`}</h1>
        <hr />
        <h1>{`Data fetched from remote api: ${data && data.url}`}</h1>
        <Main />

        <nav>
          <Link to="/home">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </nav>
        <hr />
        <Switch>
          <Route path="/home" component={ Home } />
          <Route path="/about" component={ About } />
          <Route path="/contact" component={ Contact } />
          <Route path="/" exact component={ Root } />
        </Switch>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))

