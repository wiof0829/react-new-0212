import React, { useEffect, useState } from "react";
import { Form, Select, Button, message } from "antd";
import { connect } from 'react-redux'
import { reqGetCourseList } from '@api/edu/course'
import { getChapterList } from '../redux'
import "./index.less";

const { Option } = Select;

function SearchForm() {
  const [courseList, seCourseList] = useState([])
  const [form] = Form.useForm();
  const resetForm = () => {
    form.resetFields(['courseId']);
  };
  useEffect(() => {
    async function fetchData() {
      const res = await reqGetCourseList()
      seCourseList(res)
    }
    fetchData()
  }, [])
  return (
    <Form layout="inline" form={form}>
      <Form.Item name="teacherId" label="课程">
        <Select
          allowClear
          placeholder="课程"
          style={{ width: 250, marginRight: 20 }}
        >
          <Option value="1">1</Option>
          <Option value="2">2</Option>
          <Option value="3">3</Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{ margin: "0 10px 0 30px" }}
        >
          查询课程章节
        </Button>
        <Button onClick={resetForm}>重置</Button>
      </Form.Item>
    </Form>
  );
}

export default SearchForm;
