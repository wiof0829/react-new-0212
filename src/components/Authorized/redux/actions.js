import { getInfo, getMenu } from '@api/acl/login';
import { GET_USER_INFO, GET_USER_MENU } from './constante';
//第一队用户信息
function GetUserInfoSync(data) {
	return { type: GET_USER_INFO, data };
}
export function getUserInfo() {
	return (dispatch) => {
		return getInfo().then((res) => {
			dispatch(GetUserInfoSync(res));
			return res;
		});
	};
}
//第二队用户信息
function GetUserMenuSync(data) {
	return { type: GET_USER_MENU, data };
}
export function getUserMenu() {
	return (dispatch) => {
		return getMenu().then((res) => {
			dispatch(GetUserMenuSync(res.permissionList));
			return res.permissionList;
		});
	};
}
