import axios from 'axios';

import { userConstants } from '../../utils/userConst';
import { authActions } from "../authActions";

describe('Authentication Actions', () => {
  test('Login successful', async () => {
    const expected = [
      { type: userConstants.LOGIN_REQUEST, user: { email: 'user@wolox.com.ar', password: '12345678' } },
      { type: userConstants.LOGIN_SUCCESS, user:  { data: 'token_user' } }
    ]

    axios.post = jest.fn((url) => Promise.resolve({ data: 'token_user' }))

    const dispatch = jest.fn()
    const getState = jest.fn(() => {
      'https://endpoint.local';
    });

    await authActions.login(
    {
      email: "user@wolox.com.ar",
      password: "12345678"
    }
    )(dispatch, getState);

    expect(dispatch.mock.calls[0][0]).toEqual(expected[0])
    expect(dispatch.mock.calls[1][0]).toEqual(expected[1])
  })
})