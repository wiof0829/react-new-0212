import React, { Component } from "react";
import { Button, Table } from 'antd';
import { PlusOutlined, DeleteOutlined, FormOutlined } from '@ant-design/icons'
// import { reqGetSubjectList } from '@api/edu/subject'
import { getSubjectList } from './redux'
import { connect } from 'react-redux'

import './index.less'
const columns = [
  { title: '分类名称', dataIndex: 'title', key: 'title' },
  {
    title: '操作',
    dataIndex: '',
    key: 'x',
    render: () =>
      (<>
        <Button type='primary' className='update-btn'>
          <FormOutlined />
        </Button>
        <Button type='danger'>
          <DeleteOutlined />
        </Button>
      </>),
    width: 200
  },
];
@connect(
  state => ({ subjectList: state.subjectList }),
  { getSubjectList }
)
class Subject extends Component {
  currentPage = 1
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
  render() {
    console.log(this.props)
    return (
      <div className='wap-wap'>
        <Button type='primary' className='wap-btn'>
          <PlusOutlined />
          新建
        </Button>
        <Table
          // 控制列
          columns={columns}
          // 控制可展开项
          expandable={{
            // 可展开项展示内容
            expandedRowRender: record => (
              <p style={{ margin: 0 }}>{record.description}</p>
            ),
            // 控制是否可展开
            rowExpandable: record => record.name !== 'Not Expandable'
          }}
          //表示里面的数据
          dataSource={this.props.subjectList.items}
          rowKey='_id'
          pagination={{
            total: this.props.subjectList.total, //total表示数据总数
            showQuickJumper: true, //是否显示快速跳转
            showSizeChanger: true, // 是否显示修改每页显示数据数量
            pageSizeOptions: ['5', '10', '15', '20'], //设置每天显示数据数量的配置项
            // defaultPageSize: 5 //每页默认显示数据条数 默认是10,
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
