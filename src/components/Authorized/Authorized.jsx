import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUserInfo, getUserMenu } from './redux'
import Loading from '@comps/Loading'

@connect(
  null,
  { getUserInfo, getUserMenu }
)
class Authrized extends Component {
  state = {
    loading: true
  }
  async componentDidMount() {
    let { getUserInfo, getUserMenu } = this.props
    await Promise.all([getUserInfo(), getUserMenu()])
    this.setState({
      loading: false
    })
  }
  render() {
    let { loading } = this.state
    return loading ? <Loading></Loading> : this.props.render()
  }
}
export default Authrized