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
//添加课程分类
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
//删除课程分类
export function reqUpdateSubjectList(title, id) {
	return request({
		url: `${BASE_URL}/update`,
		method: 'PUT',
		data: {
			title,
			id,
		},
	});
}
//定义删除改课程分类title的方法
export function reqDelSubject(id) {
	// request返回一个promise
	return request({
		url: `${BASE_URL}/remove/${id}`,
		method: 'DELETE',
	});
}
//获取所有一级课程分类数据
export function reqALLSubjectList() {
	// request返回一个promise
	return request({
		url: `${BASE_URL}`,
		method: 'GET',
	});
}
