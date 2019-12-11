import React from 'react'
import style from './index.module.less'
import PropTypes from 'prop-types'
import Loading from '../../resources/images/loading.gif'

class HotSearch extends React.Component {

  flag = 0

  static propTypes = {
    search: PropTypes.string.isRequired,
    show: PropTypes.bool
  }

  static defaultProps = {
    show: true
  }

  state = {
    hots: [],
    histories: [],
  }

  componentDidMount() {
    this.triggerSearch()
  }

  componentDidUpdate(pre, stat) {

    if (!this.props.search && pre.search) {
      this.triggerSearch()
    }
  }

  triggerHistory() {
    const utils = this.$utils.storage
    let histories = utils.getItem('history')
    const datas = histories && JSON.parse(histories)
    if (datas) {
      this.setState({
        histories: datas
      })
    }
  }

  triggerSearch() {
    console.log("ok")
    // 防止频繁调用
    console.log("flag is", this.flag)
    if (this.flag && this.flag === 1) return
    this.flag = 1
    console.log('flag ok', this.flag)
    setTimeout(() => {
      this.flag = 0
    }, 1000)

    // 历史
    this.triggerHistory()

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

  history() {

    const obj = (
      this.state.histories
      && (typeof this.state.histories.map === 'function')
      && this.state.histories.map((item, index) => {
        return (
          <div className={style.history_container} key={index}>
            <i className="iconfont icon-shijian"></i>
            <span>{item}</span>
            <i className="iconfont icon-guanbi" />
          </div>
        )
      })
    )

    console.log(obj)

    return obj
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

        {/* 历史记录 */}
        {console.log('history is', typeof this.state.histories.map)}
        {
          this.history()
        }

      </div>
    )
  }
}

// eslint-disable-next-line
class KeywordSearch extends React.Component {

  state = {
    allMatch: []
  }

  static propTypes = {
    search: PropTypes.string.isRequired,
    show: PropTypes.bool
  }

  static defaultProps = {
    show: true
  }

  componentDidUpdate(pre, stat) {
    if (this.props.search && this.props.search !== pre.search) {
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
        if (result.allMatch) {
          this.setState({
            allMatch: result.allMatch
          })
        }
      }
    })
  }

  render() {
    return (
      <div
        className={style.Keyword_search}
        style={{ display: this.props.show ? 'flex' : 'none' }}>
        <h3>{`搜索 "${this.props.search}"`}</h3>
        {
          <div
            className={style.loading}
            style={{
              backgroundImage: `url(${Loading}) `,
              display: this.state.allMatch.length > 0 ? 'none' : 'block'
            }}
          />
        }
        <div className={style.wrapper}>
          {/* 搜索结果 */}
          {
            this.state.allMatch
            && this.state.allMatch.map((item, index) => {
              return (
                <div
                  key={index}
                  className={style.item}
                >
                  <i className="iconfont icon-sousuo" />
                  <span>{item.keyword}</span>
                </div>
              )
            })

          }
        </div>
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

  storageHistory(search) {
    const utils = this.$utils.storage
    let history = utils.getItem('history')
    if (!history) {
      utils.setItem('history', JSON.stringify([search]))
    } else {
      let histories = JSON.parse(utils.getItem('history'))
      histories.push(search)
      histories = [...new Set(histories)]
      utils.setItem('history', JSON.stringify(histories))
    }
  }

  searchSubmit = (e) => {
    const search = e.target.value
    if (!search) return
    if (e.keyCode !== 13) return
    // 存储
    // 判断是否有如果有合并
    this.storageHistory(search)

    this.setState({
      mode: 3,
      search: search
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
            onInput={this.searchChange}
            onKeyDown={this.searchSubmit}
          />
          <i className="iconfont icon-guanbi1" style={{ display: this.state.search ? 'block' : 'none' }}></i>
        </div>
        <HotSearch search={this.state.search} show={mode === 1} />
        <KeywordSearch search={this.state.search} show={mode === 2} />
        <HotSearch search={this.state.search} show={mode === 3} />
      </div>
    )
  }
}