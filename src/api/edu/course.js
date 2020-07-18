import request from '@utils/request';
const BASE_URL = '/admin/edu/course';
//获取所有课程数据
export function reqGetCourseList() {
	return request({
		url: `${BASE_URL}`,
		methodL: `GET`,
	});
}
export function reqGetCourseLimitList({
	page,
	limit,
	title,
	teacherId,
	subjectId,
	subjectParentId,
}) {
	return request({
		url: `${BASE_URL}/${page}/${limit}`,
		ethod: 'GET',
		params: {
			title,
			teacherId,
			subjectId,
			subjectParentId,
		},
	});
}
