import axios from 'axios'

import { alertConstants } from '../../utils/alertConst'
import { authActions } from '../authActions'

describe('Alert Actions', () => {
  test('Sign up successful', async () => {
    const expected = [
      { type: alertConstants.SUCCESS, message: 'messages.registersuccess' }
    ]

    axios.post = jest.fn((url) => Promise.resolve({ data: 'token_user' }))

    const dispatch = jest.fn()
    const getState = jest.fn(() => {
      'https://endpoint.local'
    })

    await authActions.register(
      {
        name: 'Joe',
        last_name: 'Doe',
        country: 'argentina',
        province: 'buenos_aires',
        mail: 'joe.doe@gmail.com',
        phone: '47468900',
        password: 'abc12345678'
      }
    )(dispatch, getState)

    expect(dispatch.mock.calls[2][0]).toEqual(expected[0])
  })
})
