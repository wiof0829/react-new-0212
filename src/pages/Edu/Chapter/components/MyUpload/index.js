import React, { Component } from 'react';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import { reqGetQiniuToken } from '@api/edu/lesson';

const MAX_VIDEO_SIZE = 20 * 1024 * 1024;
export default class MyUpload extends Component {
	//定义一个构造函数，函数从缓存中获取数据
	constructor() {
		super();
		const str = localStorage.getItem('upload_token');
		if (str) {
			const res = JSON.parse(str);
			this.state = {
				expires: res.expires,
				uoloadToken: res.uploadToken,
			};
		} else {
			this.state = {
				expires: 0,
				uploadToken: '',
			};
		}
	}
	handleBeforeUpload = (file, fileList) => {
		return new Promise(async (resolve, reject) => {
			if (file.size > MAX_VIDEO_SIZE) {
				message.error('视频体积太大');
				reject('视频体积太大');
				return;
			}
			if (Date.now() > this.state.expires) {
				const { uploadToken, expires } = await reqGetQiniuToken();
				this.saveUploadToken(uploadToken, expires);
			}
			resolve(file);
		});
	};
	saveUploadToken = (uploadToken, expires) => {
		const targetTime = Date.now() + expires * 1000;
		expires = targetTime;
		const upload_token = JSON.stringify({ uploadToken, expires });
		localStorage.setItem('upload_token', upload_token);
		this.setState({
			uploadToken,
			expires,
		});
	};
	handleCustomRequest = () => {
		console.log('上传了');
		console.log(this.state.uploadToken);
	};
	render() {
		return (
			<Upload beforeUpload={this.handleBeforeUpload} customRequest={this.handleCustomRequest}>
				<Button>
					<UploadOutlined /> 上传视频
				</Button>
			</Upload>
		);
	}
}
