import { userConstants } from '../utils/userConst';

const initialState = {
	authenticated: false,
	user: {},
};

export function authentication(state = initialState, action) {
	switch (action.type) {
			case userConstants.LOGIN_REQUEST:
					return {
						...state,
						authenticated: true,
						user: action.user
					};
			case userConstants.LOGIN_SUCCESS:
					return {
						...state,
						authenticated: true,
						user: action.user.email
					};
			case userConstants.LOGIN_FAILURE:
					return {};
			case userConstants.LOGOUT:
					return {
						...state,
						authenticated: false
					};
			default:
					return state
	}
}