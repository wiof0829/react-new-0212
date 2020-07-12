import request from '@utils/request';
const BASE_URL = '/admin/edu/subject';
export function reqGetSubjectList(page, limit) {
	return request({
		url: `${BASE_URL}/${page}/${limit}`,
		method: 'GET',
	});
}
export function reqGetSecSubjectList(parentId) {
	return request({
		url: `${BASE_URL}/get/${parentId}`,
		method: 'get',
	});
} 
// 添加课程分类
export function reqAddSubjectList(title, parentId) {
	console.log(title, parentId);
	return request({
		url: `${BASE_URL}/save`,
		method: 'POST',
		data: {
			title,
			parentId,
		},
	});
}
