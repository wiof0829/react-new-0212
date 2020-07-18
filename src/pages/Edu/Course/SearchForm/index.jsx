import React, { useState, useEffect } from "react";
import { Form, Input, Select, Cascader, Button, message } from "antd";
import { FormattedMessage, useIntl } from 'react-intl'
import { connect } from 'react-redux'
import { reqGetAllTeacherList } from '@api/edu/teacher'
import { reqALLSubjectList, reqGetSecSubjectList } from '@api/edu/subject'
import { getCourseList } from '../redux'
import "./index.less";
const { Option } = Select;
function SearchForm(props) {
  const intl = useIntl()
  const [form] = Form.useForm()
  //存储讲师列表状态
  const [teacherList, setTeacherList] = useState([])
  //存储一级课程分类状态
  const [subjectList, setSubjectList] = useState([])
  //useEffect实现组件挂载获取数据
  useEffect(() => {
    async function fetchData() {
      //等所有请求的数据响应了之后,会拿到对应的数据
      const [teachers, subjectList] = await Promise.all([
        reqGetAllTeacherList(),
        reqALLSubjectList()
      ])
      const options = subjectList.map(subject => {
        return {
          value: subject._id,
          label: subject.title,
          isLeaf: false
        }
      })
      // console.log(res)
      setTeacherList(teachers)
      setSubjectList(options)
    }
    fetchData()
  }, [])
  const onChange = (value, selectedOptions) => {
    console.log(value, selectedOptions);
  };
  const loadData = async selectedOptions => {
    const targetOption = selectedOptions[selectedOptions.length - 1]
    targetOption.loading = true
    //发送异步请求
    let secSubject = await reqGetSecSubjectList(targetOption.value)
    secSubject = secSubject.items.map(item => {
      return {
        value: item._id,
        label: item.title
      }
    })
    // 让小圆圈隐藏
    targetOption.loading = false
    //将二级数据添加给一级的children属性
    if (secSubject.length > 0) {
      targetOption.children = secSubject
    } else {
      targetOption.isLeaf = true
    }
    //更新subject
    setSubjectList([...subjectList])
  };
  const resetForm = () => {
    form.resetFields();
  };
  const finish = async value => {
    let subjectId
    let subjectParentId
    if (value.subject && value.subject.length > 1) {
      subjectId = value.subject[1]
      subjectParentId = value.subject[0]
    }
    if (value.subject && value.subject.length === 1) {
      subjectId = value.subject[0]
      subjectParentId = 0
    }
    const data = {
      page: 1,
      limit: 5,
      title: value.title,
      teacherId: value.teacherId,
      subjectId,
      subjectParentId
    }
    await props.getCourseList(data)
    //提示
    message.success('课程数据获取成功')
  }
  return (
    <Form layout='inline' form={form} onFinish={finish}>
      {/* <Form.Item name='title' label='标题'> 国际化之前写法*/}
      <Form.Item name='title' label={<FormattedMessage id='title' />}>
        <Input
          placeholder={intl.formatMessage({
            id: 'title'
          })}
          style={{ width: 250, marginRight: 20 }}
        />
      </Form.Item>
      <Form.Item name='teacherId' label={<FormattedMessage id='teacher' />}>
        <Select
          allowClear
          placeholder={intl.formatMessage({
            id: 'teacher'
          })}
          style={{ width: 250, marginRight: 20 }}
        >
          {teacherList.map(item => (
            <Option key={item._id} value={item._id}>
              {item.name}
            </Option>
          ))}
          {/* <Option value='lucy1'>Lucy1</Option>
          <Option value='lucy2'>Lucy2</Option>
          <Option value='lucy3'>Lucy3</Option> */}
        </Select>
      </Form.Item>
      <Form.Item name='subject' label={<FormattedMessage id='subject' />}>
        <Cascader
          style={{ width: 250, marginRight: 20 }}
          options={subjectList} // 多级拉下菜单的数据
          loadData={loadData} // 点击课程分类的时候,loadData会触发,在这里去加载二级数据
          onChange={onChange} // 选中课程分类之后触发
          // changeOnSelect
          placeholder={intl.formatMessage({
            id: 'subject'
          })}
        />
      </Form.Item>
      <Form.Item>
        <Button
          type='primary'
          htmlType='submit'
          style={{ margin: '0 10px 0 30px' }}
        >
          {<FormattedMessage id='searchBtn' />}
        </Button>
        <Button onClick={resetForm}>
          {<FormattedMessage id='resetBtn' />}
        </Button>
      </Form.Item>
    </Form>
  )
}

export default connect(
  null,
  { getCourseList }
)(SearchForm)