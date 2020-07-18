import { reqGetCourseLimitList } from '@api/edu/course';
import { GET_COURSE_LIMIT_LIST } from './constant';
function getCourseListSync(data) {
	return { type: GET_COURSE_LIMIT_LIST, data };
}
export function getCourseList(data) {
	return (dispatch) => {
		//真正发送异步请求
		return reqGetCourseLimitList(data).then((res) => {
			// 调用同步action
			dispatch(getCourseListSync(res));
			return res;
		});
	};
}
