import React, { Component } from "react";
import { Button, Table, Tooltip, Input, message, Modal } from 'antd'
import { PlusOutlined, DeleteOutlined, FormOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import {
  getSubjectList, getSecSubjectList, updateSubject
} from './redux'
import { connect } from 'react-redux'

import './index.less'
import { reqDelSubject } from '@api/edu/subject'

const { confirm } = Modal
@connect(
  state => ({ subjectList: state.subjectList }),
  { getSubjectList, getSecSubjectList, updateSubject }
)
class Subject extends Component {
  currentPage = 1
  pageSize = 10
  state = {
    subjectId: '',
    subjectTitle: '' //用于设置受控组件
  }
  componentDidMount() {
    this.props.getSubjectList(1, 10)
  }
  handlePageChange = (page, pageSize) => {
    // 发送请求
    this.props.getSubjectList(page, pageSize)
    this.currentPage = page
  }
  handleSizeChange = (current, size) => {
    this.props.getSubjectList(current, size)
    this.currentPage = current
  }
  bangoCilck = () => {
    this.props.history.push('/edu/subject/add')
  }
  handleClickExpand = (expanded, record) => {
    if (expanded) {
      // 请求二级菜单数据
      this.props.getSecSubjectList(record._id)
    }
  }// 点击更新按钮的事件处理函数
  handleUpdateClick = value => {
    //修改subjectid
    return () => {
      // console.log(value)
      this.setState({
        subjectId: value._id,
        subjectTitle: value.title
      })
    }
  }

  // 修改数据时,受控组件input的change回调函数
  handleTitleChange = e => {
    this.setState({
      subjectTitle: e.target.value
    })
  }
  //取消的回调
  handleCancle = () => {
    this.setState({
      subjectId: '',
      subjectTitle: ''
    })
  }
  // 确认事件回调
  handleUpdata = () => {
    let { subjectId, subjectTitle } = this.state
    this.props.updateSubject(subjectTitle, subjectId)
    message.success('更新成功')
    this.handleCancle()
  }
  //删除
  handleDel = value => () => {
    confirm({
      title: (
        <>
          <div>
            确认删除
          <span style={{ color: 'hotpink', fontSize: 30 }}>{value.title}</span>
          </div>
        </>
      ),
      icon: <ExclamationCircleOutlined />,
      onOk: async () => {
        await reqDelSubject(value._id)
        message.success('删除成功')
        const totalPage = Math.ceil(
          this.props.subjectList.total / this.pageSize
        )
        if (
          this.currentPage !== 1 &&
          this.props.subjectList.items.length === 1 &&
          totalPage === this.currentPage
        ) {
          // console.log('请求上一页数据了')
          this.props.getSubjectList(--this.currentPage, this.pageSize)
          return
        }
        this.props.getSubjectList(this.currentPage, this.pageSize)
      }
    })
  }
  render() {
    const columns = [
      {
        title: '分类名称',
        key: 'title',
        render: value => {
          // 接收value是对饮的每一行数据
          if (this.state.subjectId === value._id) {
            return (
              <Input
                value={this.state.subjectTitle}
                className='subject-input'
                onChange={this.handleTitleChange}
              />
            )
          }
          return <span>{value.title}</span>
        }
      },
      {
        title: '操作',
        dataIndex: '',
        key: 'x',
        // 自定义这一列要渲染的内容
        render: value => {
          if (this.state.subjectId === value._id) {
            return (
              <>
                <Button type='primary' className='update-btn'
                  onClick={this.handleUpdata}>
                  确认
                </Button>
                <Button type='danger' onClick={this.handleCancle}>取消</Button>
              </>
            )
          }

          return (
            <>
              <Tooltip title='更新分类'>
                <Button
                  type='primary'
                  className='update-btn'
                  onClick={this.handleUpdateClick(value)}
                >
                  <FormOutlined />
                </Button>
              </Tooltip>
              <Tooltip title='删除分类'>
                <Button type='danger' onClick={this.handleDel(value)}>
                  <DeleteOutlined />
                </Button>
              </Tooltip>
            </>
          )
        },
        // 设置这一列的宽度
        width: 200
      }
    ];
    console.log(this.props)
    return (
      <div className='wap-wap'>
        <Button type='primary' className='wap-btn' onClick={this.bangoCilck}>
          <PlusOutlined />
          新建
        </Button>
        <Table
          // 控制列
          columns={columns}
          // 控制可展开项
          expandable={{
            onExpand: this.handleClickExpand
          }}
          //表示里面的数据
          dataSource={this.props.subjectList.items}
          rowKey='_id'
          pagination={{
            total: this.props.subjectList.total, //total表示数据总数
            showQuickJumper: true, //是否显示快速跳转
            showSizeChanger: true, // 是否显示修改每页显示数据数量
            pageSizeOptions: ['5', '10', '15', '20'], //设置每天显示数据数量的配置项
            onChange: this.handlePageChange,
            onShowSizeChange: this.handleSizeChange,
            current: this.currentPage
          }}
        />
      </div>
    )
  }
}
export default Subject
