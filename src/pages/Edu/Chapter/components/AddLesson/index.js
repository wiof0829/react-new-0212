import React, { Component } from 'react';
import { connect } from 'react-redux';
//导入antd组件
import { Link } from 'react-router-dom';
import { Card, Button, Form, Input, Switch, message, Upload } from 'antd';
import { ArrowLeftOutlined, UploadOutlined } from '@ant-design/icons';
import MyUpload from '../MyUpload'
// 导入样式
import './index.less';
//表单布局属性
const layout = {
  labelCol: {
    span: 3,
  },
  // 表单项部分
  wrapperCol: {
    span: 6,
  },
};
class AddLesson extends Component {
  // 点击添加按钮,表单校验成功之后的回调函数
  onFinish = (values) => { };
  render() {
    return (
      <Card
        title={
          <>
            <Link to='/edu/chapter/list'>
              <ArrowLeftOutlined />
            </Link>
            <span className='add-lesson'>新增课时</span>
          </>
        }>
        <Form

          // 给表单中的表单项布局
          {...layout}
          // 当点击表单内的提交按钮,onFinish会触发
          onFinish={this.onFinish}
          initialValues={{
            lesson:'请输入名称',
            free: true,
          }}
        >
          <Form.Item
            // 表示提示文字
            label='课时名称'
            // 表单项提交时的属性
            name='lesson'
            // 校验规则
            rules={[
              {
                required: true,
                // 校验不通过时的提示文字
                message: '请输入课时名称',
              },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item
            label='是否免费'
            name='free'
            rules={[
              {
                required: true,
                message: '请选择是否免费',
              },
            ]}
            valuePropName='checked'>
            <Switch checkedChildren='开启' unCheckedChildren='关闭' defaultChecked />
          </Form.Item>
          <Form.Item
            label='上传视频'
            name='video'
            rules={[
              {
                required: true,
                message: '请选择上传视频',
              },
            ]}>
            <MyUpload></MyUpload>
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit'>
              添加
						</Button>
          </Form.Item>
        </Form>
      </Card>
    );
  }
}

export default AddLesson;
