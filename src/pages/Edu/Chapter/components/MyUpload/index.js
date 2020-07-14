import React, { Component } from 'react';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
const MAX_VIDEO_SIZE = 20 * 1024 * 1024;
export default class MyUpload extends Component {
	handleBeforeUpload = (file, fileList) => {
		return new Promise((resolve, reject) => {
			if (file.size > MAX_VIDEO_SIZE) {
				message.error('视频体积太大');
				reject();
			}
			resolve(file);
		});
	};
	handleCustomRequest = () => {};
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
