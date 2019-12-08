import React, { Component } from 'react'
import home from './home.module.less'

class Header extends Component {
  render() {

    return (
      <div className={home.container}>
        <i>网易云音乐</i>
      </div>
    )
  }
}

class Tab extends Component {

  constructor() {
    super()
    this.state = {
      tabs: ['推荐音乐', '热歌榜', '搜索'],
      selectedIndex: 0,
    }
  }

  selectedTab(index) {
    return (index === this.state.selectedIndex ? <div className={home.line} /> : null)
  }

  toggelTab(index) {
    this.setState(_ => {
      return {
        selectedIndex: index
      }
    })
  }

  render() {
    alert(this.a)
    let tabs = this.state.tabs.map((item, index) => {
      return (<li
        key={index}
        onClick={this.toggelTab.bind(this, index)}
        className={index === this.state.selectedIndex ? home.active : ''}>
        {item} {this.selectedTab(index)}
      </li>)
    })

    return (
      <ul className={home.tab}>
        {tabs}
      </ul>
    )
  }
}

class Home extends Component {

  constructor(props) {
    super(props)
    this.state = {
      items: [1, 2, 3, 4, 5, 6]
    }
  }

  render() {
    return (
      <div>
        <Header />
        <Tab />
      </div>
    )
  }


}

export default Home