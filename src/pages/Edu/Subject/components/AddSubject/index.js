import React, { Component } from 'react';
//导入antd组件
import { Link } from 'react-router-dom';
import { Card, Button, Form, Input, Select, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
//import { connect } from 'react-redux';
import { reqGetSubjectList, reqAddSubjectList } from '@api/edu/subject'
//样式
import './index.less';

//获取Option组件
const Option = Select.Option;
//表单布局属性
const layout = {
	//antd把一个宽度分为24份
	//表单文字描述部分
	labelCol: {
		span: 3,
	},
	//表单项部分
	wrapperCol: {
		span: 6,
	},
};


class AddSubject extends Component {
	state = {
		subjectList: {
			total: 0,
			items: [],
		},
	};
	page = 1;
	async componentDidMount() {
		const res = await reqGetSubjectList(this.page++, 5)
		this.setState({
			subjectList: res
		})
	}
	//加载更多一级分类
	handleloadMore = async () => {
		const res = await reqGetSubjectList(this.page++, 5)
		const newItems = [...this.state.subjectList.items, ...res.items]
		this.setState({
			subjectList: {
				total: res.total,
				items: newItems
			}
		})
	}
	//点击添加按钮,表单校验成功之后的回调函数
	onFinish = async values => {
		try {
			//发送请求新增课程分类
			await reqAddSubjectList(values.subjectname, values.parentid)
			//提示
			message.success('课程分类添加成功')
			this.props.history.push('/edu/subject/list')
		} catch {
			message.error('课程分类添加失败')
		}
	}

	render() {
		return (
			<Card
				title={
					<>
						<Link to='/edu/subject/list'>
							<ArrowLeftOutlined />
						</Link>
						<span className='add-subject'>新增课程</span>
					</>
				}>

				<Form
					// 给表单中的表单项布局
					{...layout}
					name='subject'
					onFinish={this.onFinish}
				>
					<Form.Item
						// 表示提示文字
						label='课程分类'
						// 表单项提交时的属性
						name='subjectname'
						// 校验规则
						rules={[
							{
								required: true,
								// 校验不通过时的提示文字
								message: '请输入课程分类!'
							}
						]}
					>
						<Input />
					</Form.Item>

					<Form.Item
						label='父级分类id'
						name='parentid'
						rules={[
							{
								required: true,
								message: '请选择分类id'
							}
						]}
					>
						<Select
							// 自定义下拉列表中展示内容
							dropdownRender={menu => {
								return (
									<>
										{/* 表示把我们写在子节点位置的option渲染到这里 */}
										{menu}
										{/* 如果total的值,比items的长度大,说明还有数据 */}
										{this.state.subjectList.total >
											this.state.subjectList.items.length && (
												<Button type='link' onClick={this.handleloadMore}>
													加载更多数据
												</Button>
											)}
									</>
								)
							}}
						>
							{/* 一级课程分类 这一项不在获取的动态数据中,所以在这里写死*/}
							<Option value={0} key={0}>
								{'一级课程分类'}
							</Option>
							{/* 根据拿到一级课程分类,动态渲染 */}
							{this.state.subjectList.items.map(subject => {
								return (
									<Option value={subject._id} key={subject._id}>
										{subject.title}
									</Option>
								)
							})}
						</Select>
					</Form.Item>

					<Form.Item>
						{/* htmlType表示这个按钮是表单内的提交按钮 */}
						<Button type='primary' htmlType='submit'>
							添加
            </Button>
					</Form.Item>
				</Form>
			</Card>
		)
	}
}
export default AddSubject;
