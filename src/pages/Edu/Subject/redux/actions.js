import { reqGetSubjectList, reqGetSecSubjectList, reqUpdateSubjectList } from '@api/edu/subject';

import { GET_SUBJECT_LIST, GET_SECSUBJECT_LIST, UPDATE_SUBJECT } from './constants';
// 获取一级分类的同步
const getSubjectListSync = (list) => ({
	type: GET_SUBJECT_LIST,
	data: list,
});

export const getSubjectList = (page, limit) => {
	return (dispatch) => {
		return reqGetSubjectList(page, limit).then((response) => {
			dispatch(getSubjectListSync(response));
			return response;
		});
	};
};
//二级分类获取
const getSecSubjectListSync = (list) => ({
	type: GET_SECSUBJECT_LIST,
	data: list,
});
// 获取二级课程分类异步action
export const getSecSubjectList = (parentId) => {
	return (dispatch) => {
		return reqGetSecSubjectList(parentId).then((response) => {
			dispatch(getSecSubjectListSync(response));
			return response;
		});
	};
};
//删除分类
const updateSubjectSync = (data) => ({
	type: UPDATE_SUBJECT,
	data,
});
export const updateSubject = (title, id) => {
	return (dispath) => {
		reqUpdateSubjectList(title, id).then((res) => {
			dispath(updateSubjectSync({ title, id }));
			return res;
		});
	};
};
