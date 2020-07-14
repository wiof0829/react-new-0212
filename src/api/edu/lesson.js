import request from '@utils/request';
const BASE_URL = '/admin/edu/lesson';
// 获取所有课程数据
export function reqGetLessonList(chapterId) {
	return request({
		url: `${BASE_URL}/get/${chapterId}`,
		method: 'GET',
	});
}

// 新增课时, 上传视频, 获取七牛云token的方法

export function reqGetQiniuToken() {
	return request({
		url: '/uploadtoken',
		method: 'GET',
	});
}
