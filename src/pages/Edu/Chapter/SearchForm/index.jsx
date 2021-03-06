import React, { useEffect, useState } from "react";
import { Form, Select, Button, message } from "antd";
import { connect } from 'react-redux'
import { reqGetCourseList } from '@api/edu/course'
import { getChapterList } from '../redux'
import "./index.less";
const { Option } = Select;
function SearchForm(props) {
  const [courseList, seCourseList] = useState([])
  const [form] = Form.useForm();
  const resetForm = () => {
    form.resetFields(['courseId'])
  }
  useEffect(() => {
    async function fetchData() {
      const res = await reqGetCourseList()
      seCourseList(res)
    }
    fetchData()
  }, [])
  //获取章节目录
  const handleGetChapterList = async value => {
    console.log(value)
    const data = {
      page: 1,
      limit: 5,
      courseId: value.courseId
    }
    await props.getChapterList(data)
    message.success('列表获取成功')
  }

  return (
    <Form layout='inline' form={form} onFinish={handleGetChapterList}>
      <Form.Item name='courseId' label='课程'>
        <Select
          allowClear
          placeholder='课程'
          style={{ width: 250, marginRight: 20 }}
        >
          {courseList.map(course => (
            <Option key={course._id} value={course._id}>
              {course.title}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item>
        <Button
          type='primary'
          htmlType='submit'
          style={{ margin: '0 10px 0 30px' }}
        >
          查询课程章节
      </Button>
        <Button onClick={resetForm}>重置</Button>
      </Form.Item>
    </Form>
  )
}

export default connect(
  null,
  { getChapterList }
)(SearchForm)
