import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Layout, Menu, Breadcrumb } from 'antd'
import { GlobalOutlined } from '@ant-design/icons'
import './index.less'
import SiderMenu from '../SiderMenu'
import logo from '@assets/images/logo.png'
const { Header, Content, Footer, Sider } = Layout
@withRouter
@connect(state => ({ user: state.user }))
class PrimaryLayout extends Component {
  state = {
    collapsed: false
  }

  onCollapse = collapsed => {
    console.log(collapsed)
    this.setState({ collapsed })
  }
  render() {
    let { name, avatar, permissionList } = this.props.user
    const path = this.props.location.pathname
    const reg = /[/][a-z]*/g
    const matchArr = path.match(reg)
    const firstPath = matchArr[0]
    const secPath = matchArr[1]
    const thirdPath = matchArr[2] || ''
    let firstName
    let secName
    permissionList.forEach(item => {
      if (item.path === firstPath) {
        firstName = item.name
        item.children.forEach(secItem => {
          if (secItem.path === secPath + thirdPath) {
            secName = secItem.name
          }
        })
      }
    })
    return (
      <Layout className='layout'>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className='logo'>
            <img src={logo} alt='' />
            {/* <h1>硅谷教育管理系统</h1> */}
            {!this.state.collapsed && <h1>硅谷教育管理系统</h1>}
          </div>
          <SiderMenu></SiderMenu>
        </Sider>
        <Layout className='site-layout'>
          <Header className='layout-header'>
            <img src={avatar} alt='' />
            <span>{name}</span>
            <GlobalOutlined />
          </Header>
          <Content>
            <div className='layout-nav'>
              {firstName === undefined ? (
                '首页'
              ) : (
                  <>
                    {' '}
                    <Breadcrumb>
                      <Breadcrumb.Item>{firstName}</Breadcrumb.Item>
                      <Breadcrumb.Item>{secName}</Breadcrumb.Item>
                    </Breadcrumb>
                    <h2>{secName}</h2>
                  </>
                )}
            </div>
            <div className='layout-content'>Bill is a cat.</div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    )
  }
}
export default PrimaryLayout
