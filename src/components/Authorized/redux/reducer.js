import { GET_USER_INFO, GET_USER_MENU } from './constante';
const initUser = {
	//用户名
	name: '',
	//用户头像
	avatar: '',
	//用户按钮级别权限
	permissionValueList: [],
	//用户菜单级别权限
	permissionList: [],
};
export default function user(prevState = initUser, action) {
	switch (action.type) {
		case GET_USER_INFO:
			return {
				...prevState,
				...action.data,
			};
		case GET_USER_MENU:
			return {
				...prevState,
				permissionList: action.data,
			};
		default:
			return prevState;
	}
}
