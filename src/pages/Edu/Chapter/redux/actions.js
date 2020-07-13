import { GET_CHAPTER_LIST } from './constant';
import { reqGetChapterList } from '@api/edu/chapter';
function getChapterListSync(data) {
	return { type: GET_CHAPTER_LIST, data };
}
export function getChapterList({ page, limit, courseId }) {
	return (dispatch) => {
		return reqGetChapterList({
			page,
			limit,
			courseId,
		}).then((res) => {
			dispatch(getChapterListSync(res));
			return res;
		});
	};
}
