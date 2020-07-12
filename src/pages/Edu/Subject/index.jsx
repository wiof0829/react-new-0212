import React, { Component } from "react";
import { Button, Table, Tooltip, Input } from 'antd'
import { PlusOutlined, DeleteOutlined, FormOutlined } from '@ant-design/icons'
// import { reqGetSubjectList } from '@api/edu/subject'
import { getSubjectList, getSecSubjectList } from './redux'
import { connect } from 'react-redux'

import './index.less'

@connect(
  state => ({ subjectList: state.subjectList }),
  { getSubjectList, getSecSubjectList }
)
class Subject extends Component {
  currentPage = 1
  state = {
    subjectId: '',
    subjectTitle: '' //用于设置受控组件
  }
  componentDidMount() {
    // this.getSubjectList(1, 10)
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
          //判断当前数据的id是否和state里面subjectId的值是相同的,如果相同,展示确认和取消按钮,否则展示修改和删除按钮

          if (this.state.subjectId === value._id) {
            return (
              <>
                <Button type='primary' className='update-btn'>
                  确认
                </Button>
                <Button type='danger'>取消</Button>
              </>
            )
          }

          return (
            <>
              <Tooltip title='更新课程分类'>
                <Button
                  type='primary'
                  className='update-btn'
                  onClick={this.handleUpdateClick(value)}
                >
                  <FormOutlined />
                </Button>
              </Tooltip>
              <Tooltip title='删除课程分类'>
                <Button type='danger'>
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
