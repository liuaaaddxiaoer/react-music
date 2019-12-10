import React from 'react'
import style from './index.module.less'
import PropTypes from 'prop-types'

// eslint-disable-next-line
class HotSearch extends React.Component {

  static propTypes = {
    search: PropTypes.string.isRequired
  }

  state = {
    hots: [],
    historys: [],
  }

  componentDidUpdate() {
    this.triggerSearch()
  }

  triggerSearch() {
    const search = this.props.search
    if (search) {
      this.$http.search({
        keywords: '大鱼',
        type: 'mobile'
      })
    } else {

    }
  }

  render() {
    return (
      <div className={style.hot_container}>
        <div className={style.hot_search_container}>
          <h3>{this.props.search}</h3>
          <div className={style.hot_list}></div>
        </div>
      </div>
    )
  }
}


export default class Search extends React.Component {

  state = {
    search: ''
  }

  searchChange = (e) => {
    this.setState({
      search: e.target.value || ''
    })
  }

  render() {
    return (
      <div className={style.container}>
        <div className={style.searchInput}>
          <i className="iconfont icon-sousuo" />
          <input
            type="text"
            placeholder="搜索歌曲、歌手、专辑"
            onChange={this.searchChange}
          />
        </div>
        <HotSearch search={this.state.search} />
      </div>
    )
  }
}