import React, { Component } from 'react'
import home from './Home.module.css'

class Home extends Component {

  constructor(props) {
    super(props)
    this.state = {
      items: [1, 2, 3, 4, 5, 6]
    }
  }

  render() {
    return (
      <ul className={home.container}>{this.state.items.map(item => <li className={home.item}>{item}</li>)}</ul>
    )
  }


}

export default Home