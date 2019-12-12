import React, { Component } from 'react'
import home from './home.module.less'
import { Route } from 'react-router-dom'
import Recommend from './recommend'
import Hot from './hot'
import Search from './pages/search'
import PropTypes from 'prop-types'


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

  static propTypes = {
    toggleTab: PropTypes.func.isRequired
  }

  state = {
    tabs: ['推荐音乐', '热歌榜', '搜索'],
    selectedIndex: 0,
  }

  selectedTab(index) {

    const tab = (
      <div className={home.line} />
    )

    return (index === this.state.selectedIndex ? tab : null)
  }

  toggleTab(index) {

    if (this.state.selectedIndex === index) return

    this.setState(_ => {
      return {
        selectedIndex: index
      }
    })
    this.props.toggleTab(index)

  }

  render() {
    let tabs = this.state.tabs.map((item, index) => {
      return (<li
        key={index}
        onClick={this.toggleTab.bind(this, index)}
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
      items: ['recommend', 'hot', 'search']
    }
  }

  toggleTab(index) {
    console.log(index)
    this.props.history.push(`${this.props.match.path}/${this.state.items[index]}`)
  }

  render() {
    console.log(`${this.props.match.path}/hot`)
    return (
      <>
        <div className={home.wrapper}>
          <Header />
          <Tab toggleTab={this.toggleTab.bind(this)} />
        </div>
        <div className={home.stickyTop}/>
        <Route path={this.props.match.path} exact component={Search}></Route>
        <Route path={`${this.props.match.path}/${this.state.items[1]}`} exact component={Hot}></Route>
        <Route path={`${this.props.match.path}/${this.state.items[0]}`} exact component={Recommend}></Route>
        <Route path={`${this.props.match.path}/${this.state.items[2]}`} exact component={Search}></Route>
      </>
    )
  }


}

export default Home