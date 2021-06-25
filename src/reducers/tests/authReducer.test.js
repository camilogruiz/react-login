import { authentication } from '../authReducer';
import { userConstants } from '../../utils/userConst';

describe('Authentication Reducer', () => {
  const initialState = {
    authenticated: false,
    user: {},
  };

  test('returns the initial state when an action type is not passed', () => {
    const reducer = authentication(undefined, {})
    expect(reducer).toEqual(initialState)
  })

  test("handles LOGIN_SUCCESS as expected", () => {
    const reducer = authentication(initialState, {
      type: userConstants.LOGIN_SUCCESS,
      user: {
        email: "user@wolox.com.ar",
        password: "12345678"
      }
    })

    expect(reducer).toEqual({
      authenticated: true,
      user: "user@wolox.com.ar"
    })
  })
})