import React from 'react'
import style from './index.module.less'
import PropTypes from 'prop-types'

// eslint-disable-next-line
class HotSearch extends React.Component {

  static propTypes = {
    search: PropTypes.string.isRequired,
    show: PropTypes.bool
  }

  static defaultProps = {
    show: true
  }

  state = {
    hots: [],
    historys: [],
  }

  componentDidMount() {
    this.triggerSearch()
  }

  componentDidUpdate(pre, stat) {

    if (!this.props.search && pre.search) {
      this.triggerSearch()
    }
  }

  triggerSearch() {

    const search = this.props.search || ''

    this.$http.search({
      keywords: search
    }, search).then(res => {

      const result = res.result
      if (res.code === 200 && result) {

        // 判断是hot还是suggest
        if (result.hots) {
          this.setState({
            hots: result.hots
          })
        }
      }
    })
  }

  render() {
    return (
      <div
        className={style.hot_container}
        style={{ display: this.props.show ? 'flex' : 'none' }}
      >
        {
          this.state.hots.length > 0 && (
            <div className={style.hot_search_container}>
              <h3>热门搜索</h3>
              <div className={style.hot_list}>
                {
                  this.state.hots.map((hot, index) => {
                    return (
                      <li key={index}>{hot.first}</li>
                    )
                  })
                }
              </div>
            </div>
          )
        }
      </div>
    )
  }
}


export default class Search extends React.Component {

  state = {
    search: '',
    mode: 1
  }

  searchChange = (e) => {
    let mode = 1
    if (e.target.value) {
      mode = 2
    }

    this.setState({
      mode: mode,
      search: e.target.value || ''
    })
  }

  searchSubmit = (e) => {
    if (!e.target.value) return
    if (e.keyCode !== 13) return

    this.setState({
      mode: 3,
      search: e.target.value
    })
  }

  render() {

    const mode = this.state.mode

    return (
      <div className={style.container}>
        <div className={style.searchInput}>
          <i className="iconfont icon-sousuo" />
          <input
            type="text"
            placeholder="搜索歌曲、歌手、专辑"
            onChange={this.searchChange}
            onKeyDown={this.searchSubmit}
          />
        </div>
        <HotSearch search={this.state.search} show={mode === 1} />
        <HotSearch search={this.state.search} show={mode === 2} />
        <HotSearch search={this.state.search} show={mode === 3} />
      </div>
    )
  }
}