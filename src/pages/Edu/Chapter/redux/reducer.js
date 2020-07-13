import { GET_CHAPTER_LIST } from './constant';
const initChapterList = {
	total: 0,
	items: [],
};
export default function chapterList(precState = initChapterList, action) {
	switch (action.type) {
		case GET_CHAPTER_LIST:
			return action.data;
		default:
			return precState;
	}
}
