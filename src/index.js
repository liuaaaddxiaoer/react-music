import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { HashRouter } from 'react-router-dom'
import http from './http/api'
import utils from './utils'
import './resources/font/iconfont.css'

// 注册全局api
React.Component.prototype.$http = http

// 注入Utils
React.Component.prototype.$utils = utils

function router() {
  return (
    <HashRouter>
      <App />
    </HashRouter>
  )
}

ReactDOM.render(router(), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
