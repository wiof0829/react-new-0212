import React, { Component } from 'react';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import { reqGetQiniuToken } from '@api/edu/lesson';

import * as qiniu from 'qiniu-js';
import { nanoid } from 'nanoid';
//设置上传文件大小
const MAX_VIDEO_SIZE = 20 * 1024 * 1024;
export default class MyUpload extends Component {
	//定义一个构造函数，函数从缓存中获取数据
	constructor() {
		super();
		//进来看缓存中有没有token
		const str = localStorage.getItem('upload_token');
		if (str) {
			//如果没有就说明之前存储过token，
			const res = JSON.parse(str);
			this.state = {
				expires: res.expires,
				uploadToken: res.uploadToken,
			};
		} else {

			this.state = {
				expires: 0,
				uploadToken: '',
			};
		}
	}

	//上传前调用，file是上传的文件
	handleBeforeUpload = (file, fileList) => {
		return new Promise(async (resolve, reject) => {
			//限制文件大小
			if (file.size > MAX_VIDEO_SIZE) {
				message.error('视频体积太大');
				reject('视频体积太大');
				//超出限制不执行下面代码
				return;
			}
			//发送请求前判断token是否过期，过期了就重新获取
			if (Date.now() > this.state.expires) {
				const { uploadToken, expires } = await reqGetQiniuToken();
				////储存数据
				this.saveUploadToken(uploadToken, expires);
			}
			resolve(file);
		});
	};
	saveUploadToken = (uploadToken, expires) => {
		const targetTime = Date.now() + expires * 1000 - 2 * 60 * 1000;
		expires = targetTime;
		const upload_token = JSON.stringify({ uploadToken, expires });
		localStorage.setItem('upload_token', upload_token);
		this.setState({
			uploadToken,
			expires,
		});
	};
	handleCustomRequest = (value) => {
		console.log(value);
		console.log('1');
		const file = value.file;
		const key = nanoid(10);
		const token = this.state.uploadToken;
		const putExtra = {
			mimeType: 'video/*',
		};
		const config = {
			region: qiniu.region.z2,
		};
		const observable = qiniu.upload(file, key, token, putExtra, config);
		const observer = {
			next(res) {
				console.log(res);
				console.log('2');
				value.onProgress(res.total);
			},
			error(err) {
				console.log(err);
				console.log('3');
				value.onError(err);
			},
			complete: (res) => {
				console.log(res);
				console.log('4');
				value.onSuccess(res);
				this.props.onChange('http://qdghy5t4w.bkt.clouddn.com/' + res.key);
			},
		};
		this.subscription = observable.subscribe(observer); // 上传开始
	};
	// 如果组件卸载,上传取消
	componentWillUnmount() {
		// console.log(this)
		this.subscription && this.subscription.unsubscribe(); // 上传取消
	}
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
