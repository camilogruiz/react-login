import { userConstants } from '../utils/userConst';
export function registration(state = {}, action) {
  switch (action.type) {
    case userConstants.REGISTER_REQUEST:
      return { ...state, registering: true };
    case userConstants.REGISTER_SUCCESS:
      return {...state, registering: true};
    case userConstants.REGISTER_FAILURE:
      return {};
    default:
      return state
  }
}