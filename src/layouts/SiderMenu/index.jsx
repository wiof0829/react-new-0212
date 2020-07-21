import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Menu } from 'antd'
import { Link, withRouter } from 'react-router-dom'
import Icins from '@conf/icons'
import { defaultRoutes } from '@conf/routes'
const { SubMenu } = Menu
@withRouter
@connect(state => ({ permissionList: state.user.permissionList }))
class SiderMenu extends Component {
  renderMenu = menus => {
    return menus.map(menu => {
      if (menu.hidden) return
      const ICON = Icins[menu.icon]
      if (menu.children && menu.children.length) {
        return (
          <SubMenu key={menu.path} icon={<ICON />} title={menu.name}>
            {menu.children.map(secMenu => {
              if (secMenu.hidden) return
              return <Menu.Item key={menu.path + secMenu.path}>
                <Link to={menu.path + secMenu.path}>{secMenu.name}</Link>
              </Menu.Item>
            })}
          </SubMenu>
        )
      } else {
        return (
          <Menu.Item key={menu.path} icon={<ICON />}>
            {menu.path === '/' ? <Link to='/'>{menu.name}</Link> : menu.name}
          </Menu.Item>
        )
      }
    })
  }
  render() {
    console.log(this.props)
    const path = this.props.location.pathname
    console.log(path)
    const reg = /[/][a-z]*/ //提取一级菜单路径的正则
    const firstPath = path.match(reg)[0]
    return (
      <>
        <Menu
          theme='dark'
          defaultSelectedKeys={[path]}
          mode='inline'
          defaultOpenKeys={[firstPath]}
        >
          {this.renderMenu(defaultRoutes)}
          {this.renderMenu(this.props.permissionList)}
        </Menu>
      </>
    )
  }
}
export default SiderMenu

